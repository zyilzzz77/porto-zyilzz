import type { CSSProperties } from "react";

const shootingStars = [
  {
    top: "-6%",
    left: "-18%",
    angle: "25deg",
    delay: "0s",
    duration: "13s",
    width: "7.5rem",
  },
  {
    top: "4%",
    left: "18%",
    angle: "24deg",
    delay: "-8s",
    duration: "17s",
    width: "6rem",
  },
  {
    top: "14%",
    left: "-22%",
    angle: "27deg",
    delay: "-3s",
    duration: "15s",
    width: "8.5rem",
  },
  {
    top: "26%",
    left: "4%",
    angle: "23deg",
    delay: "-14s",
    duration: "19s",
    width: "6.8rem",
  },
  {
    top: "38%",
    left: "-16%",
    angle: "26deg",
    delay: "-16s",
    duration: "23s",
    width: "8rem",
  },
  {
    top: "50%",
    left: "22%",
    angle: "24deg",
    delay: "-5s",
    duration: "12s",
    width: "5.8rem",
  },
  {
    top: "-10%",
    left: "52%",
    angle: "26deg",
    delay: "-7s",
    duration: "11s",
    width: "7rem",
  },
  {
    top: "18%",
    left: "46%",
    angle: "24deg",
    delay: "-2s",
    duration: "14s",
    width: "6.4rem",
  },
  {
    top: "58%",
    left: "-20%",
    angle: "22deg",
    delay: "-4s",
    duration: "10s",
    width: "7.6rem",
  },
  {
    top: "34%",
    left: "42%",
    angle: "27deg",
    delay: "-10s",
    duration: "16s",
    width: "5.5rem",
  },
];

export function AmbientSky() {
  return (
    <div className="ambient-sky" aria-hidden="true">
      <div className="ambient-star-field" />
      {shootingStars.map((star, index) => (
        <span
          key={index}
          className="shooting-star-path"
          style={
            {
              "--star-top": star.top,
              "--star-left": star.left,
              "--star-angle": star.angle,
              "--star-delay": star.delay,
              "--star-duration": star.duration,
              "--star-width": star.width,
            } as CSSProperties
          }
        >
          <span className="shooting-star" />
        </span>
      ))}
    </div>
  );
}
