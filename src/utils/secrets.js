// Tiny helpers to (de)obfuscate strings.
// NOTE: Obfuscation is not security — it just discourages casual scraping.

export function b64decode(b64) {
    // Works in modern browsers; if you SSR, guard for window
    return atob(b64);
  }

  