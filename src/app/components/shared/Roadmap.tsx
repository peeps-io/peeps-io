"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

gsap.registerPlugin(ScrollTrigger);

interface Goal {
  label: string;
  date: string;
  description: string;
}

const Roadmap: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [chartDataState, setChartDataState] = useState<unknown[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const goals = useMemo<Goal[]>(
    () => [
      {
        label: "Official Website",
        date: "6th, Jan, 2025",
        description:
          "Launch our official website to establish an online presence, provide detailed information about our products and services, and serve as a platform for customers to engage with our brand.",
      },
      {
        label: "Alpha launch",
        date: "8th, Jan, 2025",
        description:
          "Release the alpha version of our product for internal testing and feedback gathering. This early version will focus on validating core functionalities and identifying potential improvements.",
      },
      {
        label: "Revamp of Product",
        date: "28th, Jan, 2025",
        description:
          "Implement major improvements and redesigns to the product based on feedback received during the alpha phase. This update will refine user experience and optimize performance.",
      },
      {
        label: "Beta Launch",
        date: "4th, Feb, 2025",
        description:
          "Unveil the beta version to a select group of external users for broader testing. This phase aims to gather user insights, address bugs, and fine-tune features before the final release.",
      },
      {
        label: "Second Product Revamp",
        date: "27th, Feb, 2025",
        description:
          "Conduct a second round of updates to incorporate feedback from beta users, ensuring that the product meets high standards of quality and usability ahead of the official launch.",
      },
      {
        label: "Pre-launch",
        date: "1st, Mar, 2025",
        description:
          "Begin building anticipation for the official launch by rolling out marketing campaigns, engaging early adopters, and ensuring operational readiness for a seamless launch experience.",
      },
      {
        label: "Launch of version 1.0",
        date: "5th, Mar, 2025",
        description:
          "Release the official version 1.0 of our product to the public. This milestone marks the culmination of months of development and testing, delivering a polished product to our users.",
      },
      {
        label: "Social Media Outreach",
        date: "1st, Apr, 2025",
        description:
          "Launch a dedicated social media campaign to build brand awareness, connect with our audience, and share updates about our product’s journey and future plans.",
      },
      {
        label: "Launch of version 2.0",
        date: "4th, Jul, 2025",
        description:
          "Introduce version 2.0, featuring significant enhancements and new features based on user feedback and evolving market needs. This release aims to solidify our position in the industry.",
      },
    ],
    []
  );

  const timelineLabels = useMemo<string[]>(
    () => [
      "January 2025",
      "February 2025",
      "March 2025",
      "April 2025",
      "May 2025",
      "June 2025",
      "July 2025",
      "August 2025",
      "September 2025",
      "October 2025",
      "November 2025",
      "December 2025",
    ],
    []
  );

  const fullData = useMemo<number[]>(
    () => [140, 125, 115, 105, 100, 95, 88, 80, 70, 60, 50, 40],
    []
  );

  const chartData = useMemo(() => {
    return timelineLabels.map((month, index) => ({
      month,
      progress: fullData[index],
    }));
  }, [timelineLabels, fullData]);

  const chartConfig = useMemo(
    () => ({
      progress: {
        label: "Progress",
        color: "hsl(var(--chart-1))",
      },
    }),
    []
  );

  useEffect(() => {
    // Update chart dimensions based on window size
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.6,
      });
    };

    // Run on mount and listen for resize
    if (typeof window !== "undefined") {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
    }

    // Cleanup listener
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateDimensions);
      }
    };
  }, []);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom+=500 top",
      scrub: 0.5,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const dataLength = fullData.length;
        const visibleDataPoints = Math.ceil(progress * dataLength);

        const slicedData = chartData.slice(0, visibleDataPoints);
        setChartDataState(slicedData);

        const goalIndex = Math.min(
          Math.floor(progress * goals.length),
          goals.length - 1
        );
        setActiveGoal(goals[goalIndex]);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [fullData, goals, chartData, activeGoal]);

  return (
    <section
      id="road-map"
      className="flex flex-col items-center px-4 md:px-8 my-20 md:my-56"
    >
      <div>
        <h1 className="max-w-[849px] text-xl sm:text-2xl md:leading-[70px] md:text-[50px] font-bold text-gray-800 dark:text-gray-200 my-7 md:my-14 text-center">
          Our Company Roadmap
        </h1>
      </div>
      <div
        ref={chartContainerRef}
        className="roadmap-container relative h-[400vh] bg-white dark:bg-black text-black dark:text-white"
      >
        <div className="chart-wrapper sticky top-0 w-full h-screen flex items-center justify-center">
          <div className="chart-area w-full h-full relative">
            <div className="goal-card absolute inset-0 flex items-center justify-center z-20 px-4">
              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-4 md:p-6 rounded-md shadow-lg text-center space-y-4 border border-white/20 dark:border-gray-700">
                <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {activeGoal?.label || "loading..."}
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                  {activeGoal?.date || ""}
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-[400px] mx-auto">
                  {activeGoal?.description || ""}
                </p>
              </div>
            </div>

            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">
                  Roadmap Progress
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Track Our journey to success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="w-full h-[300px] sm:h-[400px] md:h-[600px]"
                  config={chartConfig}
                >
                  <LineChart
                    data={chartDataState}
                    width={dimensions.width}
                    height={dimensions.height}
                    margin={{ top: 24, right: 24, left: 24, bottom: 24 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      content={<ChartTooltipContent hideLabel={true} />}
                    />
                    <Line
                      className="recharts-line"
                      type="monotone"
                      dataKey="progress"
                      stroke={chartConfig.progress.color}
                      strokeWidth={3}
                      dot
                      activeDot={{ r: 8 }}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
