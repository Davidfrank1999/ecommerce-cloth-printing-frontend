import { useEffect, useRef } from "react";
import gsap from "gsap";

import TShirtImg from "../../assets/images/hero_shirt.png";
import Img1a from "../../assets/images/shirtImg_1.png";
import Img1b from "../../assets/images/shirtImg_2.png";
import Img2a from "../../assets/images/shirtImg_3.png";
import Img2b from "../../assets/images/shirtImg_4.png";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imgRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    // Timeline for hero section
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // Animate title & image together
  tl.fromTo(
    [titleRef.current, imgRef.current], // 👈 animate both at once
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1 }
  )
    .fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.5"
    );
      
    // Animate boxes individually
    gsap.fromTo(
      boxRefs.current,
      { scale: 0.8, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: boxRefs.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left side text */}
          <div className="flex-1 text-center md:text-left">
            <h1
              ref={titleRef}
              className="font-HeroCustom text-gray-800 leading-tight 
                         text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
            >
              Teesy <br />
              Imprimé
            </h1>
            <p
              ref={subtitleRef}
              className="mt-4 text-lg md:text-xl text-gray-600"
            >
              Print your imagination. Wear your passion.
            </p>
          </div>

          {/* Right side image */}
          <div className="flex-1">
            <img
              ref={imgRef}
              src={TShirtImg}
              alt="Custom T-Shirt"
              className="w-full max-w-md md:ml-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 3 Box Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ [Img1a, Img1b], [Img2b, Img2a], [Img2b, Img2a] ].map(
            (pair, i) => (
              <div
                key={i}
                ref={(el) => (boxRefs.current[i] = el)}
                className="bg-gray-100 rounded-2xl flex items-center justify-center h-60"
              >
                {pair.map((img, j) => (
                  <img
                    key={j}
                    src={img}
                    alt={`Box ${i + 1}`}
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
