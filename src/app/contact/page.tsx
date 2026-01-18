import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Tools Herd AI",
  description: "Get in touch with the Tools Herd AI team. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <main className="bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-100 tracking-tight font-mono">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-300">
            Have a question, a suggestion for a tool, or a partnership inquiry? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-cyan-500/20 shadow-glow-medium">
          <form 
            action="https://formspree.io/f/xpqqwjbl" // <-- PASTE YOUR URL HERE
            method="POST"
          >
            <div className="space-y-6">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full px-3 py-2 border border-cyan-500/30 bg-slate-900/50 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:shadow-glow-medium sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-gray-950 bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors shadow-glow-medium font-semibold"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </main>
  );
}
