"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Node {
  id: number;
  name: string;
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
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    if (!wrapperRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(wrapperRef.current);

    return () => {
      resizeObserver.disconnect();
    };
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
          .distance(120)
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

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("fill", "#69b3a2")
      .call(drag(simulation));

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("dx", 18)
      .attr("dy", 4);

    simulation.on("tick", () => {
      const radius = 15; // node radius

      nodes.forEach((d) => {
        // Clamp node position within bounds
        d.x = Math.max(radius, Math.min(dimensions.width - radius, d.x!));
        d.y = Math.max(radius, Math.min(dimensions.height - radius, d.y!));
      });

      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    function drag(sim: d3.Simulation<Node, Link>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGCircleElement, Node>()
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
