
"use client"

import { siteConfig } from "@/config/site";
import { Mail, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.email}
              aria-label="Email"
              className="hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="mt-4">
          Made with caffeine & curiosity from Abuja ☕
        </p>
      </div>
    </footer>
  );
}
