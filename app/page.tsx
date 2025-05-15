import { Victor_Mono } from "next/font/google";
import ForceGraph from "@/app/components/ForceGraph";

type Node = {
  id: number;
  name: string;
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
    { id: 0, name: "JavaScript" },
    { id: 1, name: "TypeScript" },
    { id: 2, name: "Next.js" },
    { id: 13, name: "Tailwind CSS" },
    { id: 14, name: "Vite" },
    { id: 16, name: "Jest" },
  ],
  backend: [
    { id: 3, name: "Rust" },
    { id: 4, name: "Java" },
    { id: 5, name: "PostgreSQL" },
    { id: 6, name: "MongoDB" },
    { id: 9, name: "Python" },
  ],
  devops: [
    { id: 7, name: "Azure" },
    { id: 8, name: "AWS" },
    { id: 11, name: "Docker" },
    { id: 12, name: "Linux" },
  ],
  tooling: [
    { id: 10, name: "Git" },
    { id: 15, name: "GitHub" },
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

export const graphData: GraphData = {
  nodes,
  links,
};

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-end px-20 border-r border-black w-1/2 h-3/4 self-center">
        <p className="text-vertical text-right transform origin-bottom-left">
          <span className={`${victorMono.className} text-[80px] leading-none`}>
            HENRY
          </span>
          <br />
          <span className={`${victorMono.className} text-[80px] leading-none`}>
            PEARSON
          </span>
        </p>
      </div>
      <div className="flex justify-center items-center w-1/2 h-full">
        <ForceGraph nodes={graphData.nodes} links={graphData.links} />
      </div>
    </div>
  );
}
