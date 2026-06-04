



import type { Metadata } from "next";
import ToolSubmissionForm from "@/components/ToolSubmissionForm";

export const metadata: Metadata = {
  title: "Submit a Tool - Tools Herd AI",
  description: "Add your AI tool to our directory. Help the community discover the next great innovation in AI.",
};

export default function SubmitToolPage() {
  return (
    <main className="bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">


        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Submit an AI Tool
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-300">
            Help the community discover the next great AI tool. All submissions are reviewed by our team before being listed.
          </p>
        </div>

        {/* Submission Form */}
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-cyan-500/20 shadow-glow-medium">
          <ToolSubmissionForm />
        </div>
      </div>

    </main>
  );
}