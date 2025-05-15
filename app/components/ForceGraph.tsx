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

    const iconSize = 40;
    const nodeRadius = iconSize / 2 + 15;

    const nodeGroup = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(drag(simulation));

    nodeGroup
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    nodeGroup
      .append("image")
      .attr("xlink:href", (d) => d.icon)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("x", -iconSize / 2)
      .attr("y", -iconSize / 2)
      .attr("class", "tech-icon");

    simulation.on("tick", () => {
      nodes.forEach((d) => {
        d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x!));
        d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y!));
      });

      link
        .attr("x1", (d) => {
          const dx = (d.target as Node).x! - (d.source as Node).x!;
          const dy = (d.target as Node).y! - (d.source as Node).y!;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (dx * nodeRadius) / dist;
          return (d.source as Node).x! + offsetX;
        })
        .attr("y1", (d) => {
          const dx = (d.target as Node).x! - (d.source as Node).x!;
          const dy = (d.target as Node).y! - (d.source as Node).y!;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const offsetY = (dy * nodeRadius) / dist;
          return (d.source as Node).y! + offsetY;
        })
        .attr("x2", (d) => {
          const dx = (d.source as Node).x! - (d.target as Node).x!;
          const dy = (d.source as Node).y! - (d.target as Node).y!;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (dx * nodeRadius) / dist;
          return (d.target as Node).x! + offsetX;
        })
        .attr("y2", (d) => {
          const dx = (d.source as Node).x! - (d.target as Node).x!;
          const dy = (d.source as Node).y! - (d.target as Node).y!;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const offsetY = (dy * nodeRadius) / dist;
          return (d.target as Node).y! + offsetY;
        });

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function drag(sim: d3.Simulation<Node, Link>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGGElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGGElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGGElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [nodes, links, dimensions]);

  return (
    <div ref={wrapperRef} style={{ width: "95%", height: "75%" }}>
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
