"use client";

import { useState, useEffect } from "react";
import { Victor_Mono } from "next/font/google";
import ForceGraph from "@/app/components/ForceGraph";
import DateTime from "./components/DateTime";

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["500"],
});

type Node = {
  id: number;
  name: string;
  icon: string;
  group: string;
};

type Link = {
  source: number;
  target: number;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const buckets: Record<string, Node[]> = {
  frontend: [
    {
      id: 0,
      name: "JavaScript",
      icon: "/icons/javascript.svg",
      group: "frontend",
    },
    {
      id: 1,
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      group: "frontend",
    },
    { id: 2, name: "Next.js", icon: "/icons/nextjs.svg", group: "frontend" },
    {
      id: 13,
      name: "Tailwind CSS",
      icon: "/icons/tailwind.svg",
      group: "frontend",
    },
    { id: 14, name: "Vite", icon: "/icons/vite.svg", group: "frontend" },
    { id: 16, name: "Jest", icon: "/icons/jest.svg", group: "frontend" },
  ],
  backend: [
    { id: 3, name: "Rust", icon: "/icons/rust.svg", group: "backend" },
    { id: 4, name: "Java", icon: "/icons/java.svg", group: "backend" },
    {
      id: 5,
      name: "PostgreSQL",
      icon: "/icons/postgresql.svg",
      group: "backend",
    },
    { id: 6, name: "MongoDB", icon: "/icons/mongodb.svg", group: "backend" },
    { id: 9, name: "Python", icon: "/icons/python.svg", group: "backend" },
  ],
  devops: [
    { id: 7, name: "Azure", icon: "/icons/azure.svg", group: "devops" },
    { id: 8, name: "AWS", icon: "/icons/aws.svg", group: "devops" },
    { id: 11, name: "Docker", icon: "/icons/docker.svg", group: "devops" },
    { id: 12, name: "Linux", icon: "/icons/linux.svg", group: "devops" },
  ],
  tooling: [
    { id: 10, name: "Git", icon: "/icons/git.svg", group: "tooling" },
    { id: 15, name: "GitHub", icon: "/icons/github.svg", group: "tooling" },
  ],
};

const nodes: Node[] = [
  ...buckets.frontend,
  ...buckets.backend,
  ...buckets.devops,
  ...buckets.tooling,
];

const links: Link[] = [];

function connectFullyWithinBucket(bucket: Node[]): void {
  for (let i = 0; i < bucket.length; i++) {
    for (let j = i + 1; j < bucket.length; j++) {
      links.push({ source: bucket[i].id, target: bucket[j].id });
    }
  }
}

Object.values(buckets).forEach(connectFullyWithinBucket);

const graphData: GraphData = {
  nodes,
  links,
};

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <div className="flex flex-col justify-center items-end px-20 border-r border-black w-1/2 h-3/4 self-center">
          <p className="text-vertical text-right transform origin-bottom-left">
            <span
              className={`${victorMono.className} text-[80px] leading-none name-text inline-block`}
            >
              HENRY
            </span>
            <br />
            <span
              className={`${victorMono.className} text-[80px] leading-none name-text inline-block`}
            >
              PEARSON
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center w-1/2 h-full">
          <ForceGraph nodes={graphData.nodes} links={graphData.links} />
        </div>
      </div>

      <DateTime
        className={`absolute top-0 left-0 p-4 ${victorMono.className}`}
      />

      {/* PCB Line */}
      <svg className="absolute bottom-0 left-0 w-full h-screen pointer-events-none">
        <path
          d={`
      M 0 ${dimensions.height - 120}
      L 300 ${dimensions.height - 120}
      Q 320 ${dimensions.height - 120} 330 ${dimensions.height - 100}
      L 350 ${dimensions.height - 60}
      Q 360 ${dimensions.height - 40} 380 ${dimensions.height - 40}
      L ${dimensions.width} ${dimensions.height - 40}
          `}
          fill="none"
          stroke="#000000"
          strokeWidth="1"
        />
      </svg>

      {/* Status bar */}
      <div className={`${victorMono.className} absolute bottom-0 left-0 p-4`}>
        <span style={{ fontWeight: "bold", verticalAlign: "middle" }}>
          {"//"}&nbsp;
        </span>
        <span
          style={{
            textDecoration: "underline",
            fontWeight: "bold",
            verticalAlign: "middle",
          }}
        >
          STATUS: ONLINE
        </span>
        <span className="inline-block ml-1 w-[1.2em] h-[1.2em] bg-green-400 align-middle" />
        {[1, 0.5, 0.25, 0.1].map((opacity, i) => (
          <span
            key={i}
            className="inline-block w-[0.6em] h-[1.2em] align-middle"
            style={{
              opacity,
              backgroundImage: `
              repeating-conic-gradient(
                #05df72 0% 25%, 
                transparent 0% 50%
              )`,
              backgroundSize: "4px 4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
