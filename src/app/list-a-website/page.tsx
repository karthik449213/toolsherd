import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List a Website - Tools Herd AI",
  description: "Submit your AI tool to be listed on Tools Herd AI",
};

export default function ListAWebsitePage() {
  return (
    <main className="min-h-[50vh] max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">List a Website</h1>
      <p className="text-slate-600">This page is intentionally minimal.</p>
    </main>
  );
}
