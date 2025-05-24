
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check initial match
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Setup listener for changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
