import { CookieCategory, ComplianceRegion, COMPLIANCE_REGIONS } from './types';

/**
 * Compliance rules per region
 * Determines what consent is required and how to collect it
 */
export const COMPLIANCE_RULES: Record<
  ComplianceRegion,
  {
    name: string;
    requiresExplicitConsent: boolean;
    requiresGranularControl: boolean;
    cookieExpiry: number; // days
    requiresPrivacyPolicy: boolean;
    requiresConsentRecord: boolean;
    rightToDelete: boolean;
    rightToAccess: boolean;
    optOutMechanism: boolean;
    description: string;
    applicableCountries: string[];
  }
> = {
  eu: {
    name: 'GDPR (EU)',
    requiresExplicitConsent: true,
    requiresGranularControl: true,
    cookieExpiry: 365,
    requiresPrivacyPolicy: true,
    requiresConsentRecord: true,
    rightToDelete: true,
    rightToAccess: true,
    optOutMechanism: true,
    description:
      'General Data Protection Regulation (GDPR) applies to all EU residents',
    applicableCountries: [
      'AT', // Austria
      'BE', // Belgium
      'BG', // Bulgaria
      'HR', // Croatia
      'CY', // Cyprus
      'CZ', // Czech Republic
      'DK', // Denmark
      'EE', // Estonia
      'FI', // Finland
      'FR', // France
      'DE', // Germany
      'GR', // Greece
      'HU', // Hungary
      'IE', // Ireland
      'IT', // Italy
      'LV', // Latvia
      'LT', // Lithuania
      'LU', // Luxembourg
      'MT', // Malta
      'NL', // Netherlands
      'PL', // Poland
      'PT', // Portugal
      'RO', // Romania
      'SK', // Slovakia
      'SI', // Slovenia
      'ES', // Spain
      'SE', // Sweden
    ],
  },

  uk: {
    name: 'UK GDPR + PECR',
    requiresExplicitConsent: true,
    requiresGranularControl: true,
    cookieExpiry: 365,
    requiresPrivacyPolicy: true,
    requiresConsentRecord: true,
    rightToDelete: true,
    rightToAccess: true,
    optOutMechanism: true,
    description:
      'UK General Data Protection Regulation (UK GDPR) and Privacy and Electronic Communications Regulations (PECR)',
    applicableCountries: ['GB'],
  },

  us_ca: {
    name: 'CCPA (California)',
    requiresExplicitConsent: false,
    requiresGranularControl: true,
    cookieExpiry: 90,
    requiresPrivacyPolicy: true,
    requiresConsentRecord: false,
    rightToDelete: true,
    rightToAccess: true,
    optOutMechanism: true,
    description:
      'California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)',
    applicableCountries: ['US'],
  },

  india: {
    name: 'India DPDP',
    requiresExplicitConsent: true,
    requiresGranularControl: true,
    cookieExpiry: 180,
    requiresPrivacyPolicy: true,
    requiresConsentRecord: true,
    rightToDelete: true,
    rightToAccess: true,
    optOutMechanism: true,
    description:
      'Digital Personal Data Protection (DPDP) Act applies to India residents',
    applicableCountries: ['IN'],
  },

  global: {
    name: 'Global Standard',
    requiresExplicitConsent: true,
    requiresGranularControl: true,
    cookieExpiry: 365,
    requiresPrivacyPolicy: true,
    requiresConsentRecord: true,
    rightToDelete: true,
    rightToAccess: true,
    optOutMechanism: true,
    description: 'Conservative global compliance standard',
    applicableCountries: [],
  },
};

/**
 * Get compliance region based on country code
 */
export function getComplianceRegion(countryCode?: string): ComplianceRegion {
  if (!countryCode) return COMPLIANCE_REGIONS.GLOBAL;

  const code = countryCode.toUpperCase();

  // Check EU countries
  if (COMPLIANCE_RULES.eu.applicableCountries.includes(code)) {
    return COMPLIANCE_REGIONS.EU;
  }

  // Check UK
  if (COMPLIANCE_RULES.uk.applicableCountries.includes(code)) {
    return COMPLIANCE_REGIONS.UK;
  }

  // Check US (CCPA applies to California residents)
  if (COMPLIANCE_RULES.us_ca.applicableCountries.includes(code)) {
    return COMPLIANCE_REGIONS.US_CA;
  }

  // Check India
  if (COMPLIANCE_RULES.india.applicableCountries.includes(code)) {
    return COMPLIANCE_REGIONS.INDIA;
  }

  return COMPLIANCE_REGIONS.GLOBAL;
}

/**
 * Get compliance rules for region
 */
export function getComplianceRules(region: ComplianceRegion) {
  return COMPLIANCE_RULES[region];
}

/**
 * Check if explicit consent required for category
 */
export function isExplicitConsentRequired(
  category: CookieCategory,
  region: ComplianceRegion
): boolean {
  const rules = COMPLIANCE_RULES[region];
  
  // Essential cookies never require explicit consent
  if (category === 'essential') {
    return false;
  }

  // Functional cookies may not require explicit consent in some regions
  // but we default to requiring it for privacy
  
  return rules.requiresExplicitConsent;
}

/**
 * Check if granular control required
 */
export function isGranularControlRequired(region: ComplianceRegion): boolean {
  return COMPLIANCE_RULES[region].requiresGranularControl;
}

/**
 * Get cookie retention period
 */
export function getCookieRetentionDays(region: ComplianceRegion): number {
  return COMPLIANCE_RULES[region].cookieExpiry;
}

/**
 * Check if data deletion request required
 */
export function supportsDataDeletion(region: ComplianceRegion): boolean {
  return COMPLIANCE_RULES[region].rightToDelete;
}

/**
 * Check if data access request required
 */
export function supportsDataAccess(region: ComplianceRegion): boolean {
  return COMPLIANCE_RULES[region].rightToAccess;
}

/**
 * GDPR: Pre-ticked boxes check
 * Returns true if boxes must NOT be pre-ticked
 */
export function mustNotPreTickBoxes(region: ComplianceRegion): boolean {
  // GDPR and UK GDPR require explicit, freely given consent
  // which means boxes cannot be pre-ticked
  return (
    region === COMPLIANCE_REGIONS.EU ||
    region === COMPLIANCE_REGIONS.UK ||
    region === COMPLIANCE_REGIONS.INDIA
  );
}

/**
 * Check if opt-out mechanism required
 */
export function requiresOptOutMechanism(region: ComplianceRegion): boolean {
  return COMPLIANCE_RULES[region].optOutMechanism;
}

/**
 * Privacy policy requirements
 */
export function requiresPrivacyPolicy(region: ComplianceRegion): boolean {
  return COMPLIANCE_RULES[region].requiresPrivacyPolicy;
}

/**
 * Get region-specific banner text
 */
export function getBannerText(
  region: ComplianceRegion
): { title: string; description: string } {
  const texts: Record<
    ComplianceRegion,
    { title: string; description: string }
  > = {
    eu: {
      title: 'Cookie Consent (GDPR)',
      description:
        'We use cookies to enhance your experience. By continuing to use our site, you consent to our cookie usage. Please review our privacy policy.',
    },
    uk: {
      title: 'Cookie Consent (UK GDPR)',
      description:
        'We need your consent to use cookies. This helps us improve your experience and provide personalized content.',
    },
    us_ca: {
      title: 'Your Privacy Choices (CCPA)',
      description:
        'We and our partners use cookies and similar technologies. You have the right to opt out of data sales.',
    },
    india: {
      title: 'Cookie Consent (DPDP)',
      description:
        'We process cookies with your explicit consent. You can manage your preferences at any time.',
    },
    global: {
      title: 'Cookie Notice',
      description:
        'We use cookies to improve your experience. You can control your preferences below.',
    },
  };

  return texts[region];
}

/**
 * Compliance checklist
 */
export function getComplianceChecklist(region: ComplianceRegion): string[] {
  const rules = COMPLIANCE_RULES[region];
  const checklist: string[] = [
    `✓ Comply with ${rules.name}`,
  ];

  if (rules.requiresExplicitConsent) {
    checklist.push('✓ Collect explicit user consent');
  }
  if (rules.requiresGranularControl) {
    checklist.push('✓ Provide granular cookie controls');
  }
  if (rules.requiresPrivacyPolicy) {
    checklist.push('✓ Maintain updated privacy policy');
  }
  if (rules.requiresConsentRecord) {
    checklist.push('✓ Record and store consent proof');
  }
  if (rules.rightToDelete) {
    checklist.push('✓ Implement right to data deletion');
  }
  if (rules.rightToAccess) {
    checklist.push('✓ Implement right to data access');
  }
  if (rules.optOutMechanism) {
    checklist.push('✓ Provide opt-out mechanism');
  }

  return checklist;
}
