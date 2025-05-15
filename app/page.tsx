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

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-end pr-10 border-r border-black w-1/2 h-1/2 self-center">
        <p className="text-vertical text-right transform origin-bottom-left">
          Henry Pearson
        </p>
      </div>
      <div className="flex justify-center items-center w-1/2 h-full">
        <ForceGraph nodes={graphData.nodes} links={graphData.links} />
      </div>
    </div>
  );
}
