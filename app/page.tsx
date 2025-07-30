import { Victor_Mono } from "next/font/google";
import DateTime from "./components/DateTime";

const victorMono = Victor_Mono({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <div className="flex w-full h-full flex-row items-center transition-all duration-300 min-h-screen">
        <div className="flex flex-col justify-center items-end w-1/2 h-auto  px-20 self-center py-0 bg-white">
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
            {/* Project Cards */}
            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>001_TASK_MANAGER</div>
              <div className="text-xs text-gray-600 mt-1">
                REACT • NODE.JS • POSTGRESQL
              </div>
              <div className="text-xs text-gray-500">
                FULL-STACK PRODUCTIVITY APP
              </div>
            </div>

            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>002_CHAT_SYSTEM</div>
              <div className="text-xs text-gray-600 mt-1">
                NEXT.JS • WEBSOCKETS • REDIS
              </div>
              <div className="text-xs text-gray-500">
                REAL-TIME MESSAGING PLATFORM
              </div>
            </div>

            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>003_API_GATEWAY</div>
              <div className="text-xs text-gray-600 mt-1">
                EXPRESS • DOCKER • KUBERNETES
              </div>
              <div className="text-xs text-gray-500">
                MICROSERVICES ORCHESTRATION
              </div>
            </div>

            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>004_DATA_VISUALIZER</div>
              <div className="text-xs text-gray-600 mt-1">
                D3.JS • PYTHON • MONGODB
              </div>
              <div className="text-xs text-gray-500">
                INTERACTIVE ANALYTICS DASHBOARD
              </div>
            </div>

            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>005_BLOCKCHAIN_TRACKER</div>
              <div className="text-xs text-gray-600 mt-1">
                RUST • ETHEREUM • GRAPHQL
              </div>
              <div className="text-xs text-gray-500">
                CRYPTO TRANSACTION MONITOR
              </div>
            </div>

            <div className="border-l-2 border-black pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`text-sm font-bold`}>006_ML_PIPELINE</div>
              <div className="text-xs text-gray-600 mt-1">
                TENSORFLOW • FASTAPI • AWS
              </div>
              <div className="text-xs text-gray-500">
                AUTOMATED MODEL DEPLOYMENT
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-gray-200">
              <div className={`text-xs text-gray-400`}>
                {"// SCROLL FOR MORE PROJECTS"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DateTime className={`absolute top-0 left-0 p-2 sm:p-4`} />

      {/* Status bar */}
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
