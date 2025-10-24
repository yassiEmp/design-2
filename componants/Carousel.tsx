"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type CarouselProps = { images: StaticImageData[] };

function Carousel({ images }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const [containerWidth, setContainerWidth] = useState(0);

  const imageWidth = 500; // spacing
  const totalImages = images.length;
  const duplicatedImages = [...images, ...images, ...images];

  // Set container width and initial offset
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      // Start offset so first real image is centered
      offset.current = totalImages * imageWidth + imageWidth / 2 - containerRef.current.offsetWidth / 2;
    }
  }, [images]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll(".carousel-image")) as HTMLElement[];

    const render = () => {
      const center = containerWidth / 2;

      imgs.forEach((img, idx) => {
        const x = idx * imageWidth - offset.current;

        // Distance from center of container
        const imgCenter = x + imageWidth / 2;
        const distanceFromCenter = imgCenter - center;

        // Rotate and optional scale
        const rotateY = (distanceFromCenter / containerWidth) * 10; // tweak 30 for strength
        const scale = 1 - Math.min(Math.abs(distanceFromCenter) / (containerWidth * 2), 0.3);

        img.style.transform = `translateX(${x}px) rotateY(${rotateY}deg) scale(${scale})`;
        img.style.opacity = `${rotateY + 10}`
        img.style.zIndex = `${1000 - Math.abs(Math.round(distanceFromCenter))}`;
      });

      // Move carousel
      offset.current += velocity.current;
      velocity.current *= 0.95; // friction

      // Loop seamlessly
      if (offset.current >= totalImages * imageWidth * 2) {
        offset.current -= totalImages * imageWidth;
      } else if (offset.current < 0) {
        offset.current += totalImages * imageWidth;
      }

      // Snap to nearest image
      if (!isDragging.current && Math.abs(velocity.current) < 0.3) {
        const snapIndex = Math.round(offset.current / imageWidth);
        const snapTarget = snapIndex * imageWidth;
        const diff = snapTarget - offset.current;
        offset.current += diff * 0.08; // easing
      }

      requestAnimationFrame(render);
    };
    render();

    // Drag handling
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - lastX.current;
      velocity.current = -delta; // reverse for natural dragging
      lastX.current = e.clientX;
    };
    const onMouseUp = () => (isDragging.current = false);
    const onMouseLeave = () => (isDragging.current = false);

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [images, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-visible perspective-[900px] h-[400px]"
      style={{ width: "100%", userSelect: "none", cursor: "grab" }}
    >
      {duplicatedImages.map((img, idx) => (
        <Image
          key={idx}
          width={800}
          height={400}
          className="absolute top-0 left-0 carousel-image rounded-2xl object-cover w-[30vw] min-w-[600px] h-[400px] transform-style-preserve-3d"
          draggable={false}
          alt={`carousel image ${idx}`}
          src={img}
        />
      ))}
    </div>
  );
}

export default Carousel;
