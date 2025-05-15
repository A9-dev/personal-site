import { Victor_Mono } from "next/font/google";
import ForceGraph from "@/app/components/ForceGraph";
const graphData = {
  nodes: [
    { id: 0, name: "JavaScript" },
    { id: 1, name: "TypeScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Angular" },
    { id: 4, name: "Vue" },
    { id: 5, name: "Node.js" },
    { id: 6, name: "Python" },
    { id: 7, name: "Django" },
    { id: 8, name: "Flask" },
    { id: 9, name: "Ruby" },
    { id: 10, name: "Rails" },
  ],
  links: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 0, target: 5 },
    { source: 6, target: 7 },
    { source: 6, target: 8 },
    { source: 9, target: 10 },
  ],
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
