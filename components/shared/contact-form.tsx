"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { contactSchema, type ContactInput } from "@/lib/validation";
import { isLikelySpam } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

async function sendContactMessage(data: ContactInput) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export function ContactForm() {
  const [formOpenedAt] = useState(Date.now());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", subject: "", message: "", honeypot: "" },
  });

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success("Message sent! We'll get back to you shortly.");
      reset();
    },
    onError: () => toast.error("Couldn't send your message. Please try calling us instead."),
  });

  function onSubmit(data: ContactInput) {
    if (isLikelySpam(formOpenedAt, data.honeypot ?? "")) {
      toast.error("Submission blocked. Please try again.");
      return;
    }
    mutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-label="Contact form">
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Full Name</Label>
          <Input id="c-name" error={!!errors.name} {...register("name")} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="c-phone">Mobile Number</Label>
          <Input id="c-phone" type="tel" error={!!errors.phone} {...register("phone")} placeholder="98765 43210" />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="c-email">Email Address</Label>
        <Input id="c-email" type="email" error={!!errors.email} {...register("email")} placeholder="you@example.com" />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="c-subject">Subject</Label>
        <Input id="c-subject" error={!!errors.subject} {...register("subject")} placeholder="How can we help?" />
        {errors.subject && <p className="mt-1 text-xs text-danger">{errors.subject.message}</p>}
      </div>
      <div>
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" error={!!errors.message} {...register("message")} placeholder="Tell us more..." rows={5} />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
