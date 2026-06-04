'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/use-toast'

interface FormData {
  toolName: string
  toolUrl: string
  toolDescription: string
  toolCategory: string
  pricingModel: string
  submitterEmail: string
  submitterName: string
  brandImage: File | null
}

export default function ToolSubmissionForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    toolName: '',
    toolUrl: '',
    toolDescription: '',
    toolCategory: '',
    pricingModel: 'Freemium',
    submitterEmail: '',
    submitterName: '',
    brandImage: null,
  })
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image smaller than 5MB',
          variant: 'destructive',
        })
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a valid image file',
          variant: 'destructive',
        })
        return
      }

      setFormData(prev => ({
        ...prev,
        brandImage: file,
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `tool-brands/${fileName}`

    const { data, error } = await supabase.storage
      .from('tool-submissions')
      .upload(filePath, file)

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('tool-submissions')
      .getPublicUrl(filePath)

    return publicUrlData.publicUrl
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate required fields
      if (
        !formData.toolName ||
        !formData.toolUrl ||
        !formData.toolDescription ||
        !formData.submitterEmail ||
        !formData.submitterName
      ) {
        toast({
          title: 'Missing required fields',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      let brandImageUrl: string | null = null

      // Upload image if provided
      if (formData.brandImage) {
        brandImageUrl = await uploadImage(formData.brandImage)
      }

      // Insert data into Supabase
      const { error } = await supabase.from('tool_submissions').insert([
        {
          tool_name: formData.toolName,
          tool_url: formData.toolUrl,
          tool_description: formData.toolDescription,
          tool_category: formData.toolCategory,
          pricing_model: formData.pricingModel,
          submitter_email: formData.submitterEmail,
          submitter_name: formData.submitterName,
          brand_image_url: brandImageUrl,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        throw error
      }

      toast({
        title: 'Success!',
        description: 'Your tool submission has been received. We\'ll review it soon!',
      })

      // Reset form
      setFormData({
        toolName: '',
        toolUrl: '',
        toolDescription: '',
        toolCategory: '',
        pricingModel: 'Freemium',
        submitterEmail: '',
        submitterName: '',
        brandImage: null,
      })
      setPreviewUrl('')
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'An error occurred while submitting your tool',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Submitter Name */}
        <div>
          <label htmlFor="submitterName" className="block text-sm font-medium text-slate-300">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="submitterName"
              id="submitterName"
              value={formData.submitterName}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
        </div>

        {/* Tool Name */}
        <div>
          <label htmlFor="toolName" className="block text-sm font-medium text-slate-300">
            Tool Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="toolName"
              id="toolName"
              value={formData.toolName}
              onChange={handleInputChange}
              required
              placeholder="e.g., SuperAI Writer"
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
        </div>

        {/* Tool Website URL */}
        <div>
          <label htmlFor="toolUrl" className="block text-sm font-medium text-slate-300">
            Tool Website URL <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="url"
              name="toolUrl"
              id="toolUrl"
              value={formData.toolUrl}
              onChange={handleInputChange}
              required
              placeholder="https://example.com"
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
        </div>

        {/* Tool Description */}
        <div>
          <label htmlFor="toolDescription" className="block text-sm font-medium text-slate-300">
            Tool Description <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <textarea
              id="toolDescription"
              name="toolDescription"
              value={formData.toolDescription}
              onChange={handleInputChange}
              rows={3}
              required
              placeholder="A short, catchy description of what this tool does."
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">This will be the main description on the tools listing page.</p>
        </div>

        {/* Tool Category */}
        <div>
          <label htmlFor="toolCategory" className="block text-sm font-medium text-slate-300">
            Tool Category/Categories
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="toolCategory"
              id="toolCategory"
              value={formData.toolCategory}
              onChange={handleInputChange}
              placeholder="e.g., Copywriting, Image Generation, SEO"
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">Separate multiple categories with a comma.</p>
        </div>

        {/* Pricing Model */}
        <div>
          <label htmlFor="pricingModel" className="block text-sm font-medium text-slate-300">
            Pricing Model
          </label>
          <select
            id="pricingModel"
            name="pricingModel"
            value={formData.pricingModel}
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
          >
            <option>Freemium</option>
            <option>Free</option>
            <option>Free Trial</option>
            <option>Paid (One-time)</option>
            <option>Subscription</option>
            <option>Contact for Pricing</option>
          </select>
        </div>

        {/* Brand Image */}
        <div>
          <label htmlFor="brandImage" className="block text-sm font-medium text-slate-300">
            Brand/Logo Image
          </label>
          <div className="mt-1">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="brandImage"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-cyan-500/30 rounded-lg cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 transition-colors"
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img src={previewUrl} alt="Preview" className="max-h-20 max-w-20 object-contain mb-2" />
                    <p className="text-xs text-slate-400">Click to change image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 text-cyan-500/50 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-xs text-slate-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  id="brandImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-500">Upload your tool&#39;s logo or brand image</p>
        </div>

        {/* Submitter Email */}
        <div>
          <label htmlFor="submitterEmail" className="block text-sm font-medium text-slate-300">
            Your Email Address <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="submitterEmail"
              id="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-slate-500">We&#39;ll use this to contact you with any questions about your submission.</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>
    </form>
  )
}
