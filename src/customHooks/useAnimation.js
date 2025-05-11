import { useEffect, useRef } from "react";

export function useAnimation(delay) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.style.animationDelay = `${delay}ms`;
      node.classList.add("fade-in");
    }
  }, [delay]);

  return ref;
}
