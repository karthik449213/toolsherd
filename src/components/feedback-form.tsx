import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FeedbackForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="block text-white hover:text-emerald-300 font-semibold transition-colors duration-300">
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send us your feedback</DialogTitle>
        </DialogHeader>
        <form
          action="https://formspree.io/f/movddyeg" // Replace with your Formspree form ID
          method="POST"
          className="space-y-4"
        >
          <div>
            <Input
              placeholder="Your Email"
              name="email"
              type="email"
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              placeholder="Subject"
              name="subject"
              required
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder="Your message"
              name="message"
              required
              className="w-full min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Send Feedback
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
