import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

// A reusable hook to handle common GSAP animation patterns
// and ensure proper cleanup.
const useGsapAnimations = (
  animationFn: (target: HTMLElement | null) => gsap.core.Tween | gsap.core.Timeline | undefined,
  dependencies: React.DependencyList = []
) => {
  const ref = useRef<HTMLElement>(null);
  const anim = useRef<gsap.core.Tween | gsap.core.Timeline | undefined>();

  useEffect(() => {
    if (ref.current) {
      anim.current = animationFn(ref.current);
    }

    return () => {
      if (anim.current) {
        anim.current.kill();
      }
      // Note: ScrollTrigger.getAll().forEach(st => st.kill())
      // is usually handled globally in App.tsx or a main GSAP context provider
      // to avoid killing triggers for other components prematurely.
      // If a ScrollTrigger is specific to this ref and created within animationFn,
      // ensure it's killed by `anim.kill()` or target its specific trigger.
    };
  }, dependencies);

  return ref;
};

export default useGsapAnimations;