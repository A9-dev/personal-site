"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Node {
  id: number;
  name: string;
  icon: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: number | Node;
  target: number | Node;
}

interface ForceGraphProps {
  nodes: Node[];
  links: Link[];
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(180)
      )
      .force("charge", d3.forceManyBody().strength(-90))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 2);

    const iconSize = 60;

    const node = svg
      .append("g")
      .selectAll("image")
      .data(nodes)
      .enter()
      .append("image")
      .attr("xlink:href", (d) => d.icon)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("x", (d) => (d.x ?? 0) - iconSize / 2)
      .attr("y", (d) => (d.y ?? 0) - iconSize / 2)
      .call(drag(simulation));

    simulation.on("tick", () => {
      nodes.forEach((d) => {
        d.x = Math.max(iconSize / 2, Math.min(width - iconSize / 2, d.x!));
        d.y = Math.max(iconSize / 2, Math.min(height - iconSize / 2, d.y!));
      });

      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      node
        .attr("x", (d) => d.x! - iconSize / 2)
        .attr("y", (d) => d.y! - iconSize / 2);
    });

    function drag(sim: d3.Simulation<Node, Link>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGImageElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGImageElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGImageElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGImageElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [nodes, links, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: "80%", height: "50%" }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: "block" }}
      />
    </div>
  );
};

export default ForceGraph;
