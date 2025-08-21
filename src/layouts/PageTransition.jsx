// src/components/layout/PageTransition.jsx
import { useEffect, useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import gsap from "gsap";

function PageTransition() {
  const containerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const elements = containerRef.current?.children; // all direct children

    if (elements) {
      const tl = gsap.timeline();

      // Hide children initially
      gsap.set(elements, { opacity: 0, y: 50 });

      // Animate children in sequence
      tl.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15, // delay between each child
      });
    }
  }, [location]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default PageTransition;
