import React from "react";
import { Download, Linkedin, Sun, Moon } from "lucide-react";

export default function TopBar({ cvBlobUrl, theme, onToggleTheme, PROFILE, Container, ThemeToggle  ,Button }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/60 dark:bg-neutral-900/80 border-b border-gray-100 dark:border-neutral-800">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-sm font-semibold">{PROFILE.name}</a>
        <div className="flex items-center gap-2">
          <Button
            as="a"
            href={cvBlobUrl}
            download
            className="bg-black text-white dark:bg-white dark:text-black"
            title="Download my CV"
          >
            <Download className="h-4 w-4" /> Get my CV
          </Button>
          <Button as="a" href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="bg-white border dark:bg-neutral-900 dark:border-neutral-800">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </Button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </Container>
    </div>
  );
}