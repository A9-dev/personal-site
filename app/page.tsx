import { Victor_Mono } from "next/font/google";
import DateTime from "./components/DateTime";

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const projects = [
    {
      id: "001_EVENT_SCHEDULER",
      tech: "Next.js • tRPC • PostgreSQL • Docker",
      desc: "A full-stack application for managing and coordinating events. Features include real-time updates, user authentication, and a robust API for third-party integrations.",
    },
    {
      id: "002_FINANCIAL_DASHBOARD",
      tech: "React • Node.js • GraphQL • MongoDB • AWS Lambda",
      desc: "A real-time financial data visualization platform. It aggregates data from multiple sources, uses GraphQL for efficient data fetching, and leverages serverless functions for scalability.",
    },
    {
      id: "003_ECOMMERCE_MICROSERVICES",
      tech: "Spring Boot • Kafka • Kubernetes • PostgreSQL • Redis",
      desc: "A high-availability e-commerce platform built on a microservices architecture. It uses Kafka for inter-service communication, Kubernetes for container orchestration, and Redis for a high-speed caching layer.",
    },
    {
      id: "004_AI_POWERED_CHATBOT",
      tech: "Python • TensorFlow • FastAPI • Docker • GCP",
      desc: "A machine learning-powered chatbot service. The backend is built with FastAPI for fast and easy deployment, with the entire system containerized for portability and hosted on the Google Cloud Platform.",
    },
    {
      id: "005_REAL_TIME_COLLABORATION",
      tech: "SvelteKit • WebSockets • Go • Redis • NATS",
      desc: "A real-time document collaboration tool, similar to Google Docs. It uses WebSockets for instant updates, a Go backend for high performance, and NATS for a scalable messaging system.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <div className="flex w-full h-full flex-row items-center min-h-screen">
        <div className="flex flex-col justify-center items-end w-1/2 h-auto px-20 self-center bg-white">
          <p className="text-vertical text-right transform origin-bottom-left">
            <span
              className={`${victorMono.className} text-[80px] leading-none name-text inline-block tracking-wide`}
            >
              HENRY
            </span>
            <br />
            <span
              className={`${victorMono.className} text-[80px] leading-none name-text inline-block tracking-wide`}
            >
              PEARSON
            </span>
          </p>
        </div>
        <div className="flex justify-center items-center w-1/2 h-full bg-white">
          <div className="w-full max-w-md space-y-1">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`text-sm font-bold`}>{project.id}</div>
                <div className="text-xs text-gray-600 mt-1">{project.tech}</div>
                <div className="text-xs text-gray-500">{project.desc}</div>
              </div>
            ))}
            <div className="mt-4 pt-2 border-t border-gray-200">
              <div className={`text-xs text-gray-400`}>
                {"// SCROLL FOR MORE PROJECTS"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DateTime className={`absolute top-0 left-0 p-2 sm:p-4`} />
      <div
        className={`${victorMono.className} absolute bottom-4 left-4 p-2 w-full flex items-center text-xs sm:text-base`}
      >
        <span className="font-bold align-middle">{"//"}&nbsp;</span>
        <span className="underline font-bold align-middle">STATUS: ONLINE</span>
        <span className="inline-block ml-1 w-[1.2em] h-[1.2em] bg-green-400 align-middle" />
        {[1, 0.5, 0.25, 0.1].map((opacity, i) => (
          <span
            key={i}
            className={`inline-block w-[0.6em] h-[1.2em] align-middle bg-[repeating-conic-gradient(#05df72_0%_25%,transparent_0%_50%)] bg-[length:4px_4px]`}
            style={{ opacity }}
          />
        ))}
      </div>
    </div>
  );
}
