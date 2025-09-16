import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Tools Herd AI",
  description: "Contact Tools Herd AI",
};

export default function ContactPage() {
  return (
    <main className="min-h-[50vh] max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Contact</h1>
      <p className="text-slate-600">This page is intentionally minimal.</p>
    </main>
  );
}
