import { gsap } from "gsap";
import { useEffect } from "react";

interface FadeInProps {
  children: React.ReactNode;
}
export const FadeIn = ({ children }: FadeInProps) => {
  const elementClassName = "fade-in";

  useEffect(() => {
    const textAnimation = gsap.timeline();
    textAnimation.fromTo(
      `.${elementClassName}`,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
      },
    );
  }, []);
  return (
    <div className={`${elementClassName} opacity-100 rotate-0`}>{children}</div>
  );
};
