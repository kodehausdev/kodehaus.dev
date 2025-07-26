
import { contactMethods } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Seyi',
  description: 'Get in touch with Seyi. Find links to Twitter, GitHub, and Email.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12 py-8 max-w-2xl mx-auto">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate. Feel free to reach out!
        </p>
      </section>

      <section className="space-y-6">
        {contactMethods.map((method) => (
          <Card key={method.name} className="shadow-md hover:shadow-primary/15 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <method.Icon className="h-6 w-6 mr-3 text-primary" />
                {method.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-muted-foreground break-all">{method.text}</p>
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto shrink-0">
                <Link href={method.href} target={method.name !== "Email" ? "_blank" : undefined} rel={method.name !== "Email" ? "noopener noreferrer" : undefined}>
                  Connect <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="text-center pt-8">
        <p className="text-muted-foreground">
          Looking forward to hearing from you!
        </p>
      </section>
    </div>
  );
}
