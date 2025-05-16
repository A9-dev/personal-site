"use client";

import { useEffect, useState } from "react";

type DateTimeProps = {
  className?: string;
};

const getCurrentTimeString = () => {
  const now = new Date();
  return now.toISOString().replace("Z", "") + "Z";
};

export default function DateTime({ className = "" }: DateTimeProps) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      setTimeString(getCurrentTimeString());
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!timeString) {
    // Render nothing until timeString is available
    return null;
  }

  const combinedClassName = `${className} fade-in-slide-down`.trim();

  return <div className={combinedClassName}>DATETIME: {timeString}</div>;
}
