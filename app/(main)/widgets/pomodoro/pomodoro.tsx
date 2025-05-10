"use client";

import { useEffect, useState } from "react";
import { Clock, Play, Pause, RotateCcw, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimerSettings } from "./timer-settings";

type TimerMode = "work" | "shortBreak" | "longBreak";

interface Settings {
  work: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

interface PomodoroEmbedWidgetProps {
  content: string; // or any other type that makes sense for your component
  placeholder: string | undefined;
}

const PomodoroEmbedWidget = ({}: PomodoroEmbedWidgetProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: true,
    autoStartPomodoros: true,
  });

  // Initialize timer based on selected mode
  useEffect(() => {
    switch (mode) {
      case "work":
        setTimeLeft(settings.work * 60);
        break;
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60);
        break;
      case "longBreak":
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  }, [mode, settings]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      console.log("OK");
      // Play notification sound
      const audio = new Audio("/notification.mp3");
      audio.play().catch((e) => console.log("Audio play failed:", e));

      // Handle timer completion
      if (mode === "work") {
        console.log("work1");

        const newCompletedPomodoros = completedPomodoros + 1;
        setCompletedPomodoros(newCompletedPomodoros);

        // Every 4 pomodoros, take a long break
        if (newCompletedPomodoros % 4 === 0) {
          console.log("longBreak");

          setMode("longBreak");
          if (settings.autoStartBreaks) setIsRunning(true);
          else setIsRunning(false);
        } else {
          setMode("shortBreak");
          console.log("shortBreak");
          console.log("settings.autoStartBreaks");
          console.log(settings.autoStartBreaks);
          console.log("settings.autoStartBreaks");

          if (settings.autoStartBreaks) setIsRunning(true);
          else setIsRunning(false);
        }
      } else {
        // After break, go back to work
        setMode("work");
        console.log("work2");
        if (settings.autoStartPomodoros) setIsRunning(true);
        else setIsRunning(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, completedPomodoros, settings]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let totalTime;
    switch (mode) {
      case "work":
        totalTime = settings.work * 60;
        break;
      case "shortBreak":
        totalTime = settings.shortBreak * 60;
        break;
      case "longBreak":
        totalTime = settings.longBreak * 60;
        break;
      default:
        totalTime = settings.work * 60;
    }
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    switch (mode) {
      case "work":
        setTimeLeft(settings.work * 60);
        break;
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60);
        break;
      case "longBreak":
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };

  return (
    <div className="w-full max-w-md h-full">
      {showSettings ? (
        <TimerSettings
          settings={settings}
          onSave={(newSettings) => {
            setSettings(newSettings);
            setShowSettings(false);
            resetTimer();
          }}
          onCancel={() => setShowSettings(false)}
        />
      ) : (
        <Card className="w-full h-full">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                Pomodoro Timer
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(true)}
                aria-label="Settings"
              >
                <Settings2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {completedPomodoros} completed
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <Tabs
              defaultValue="work"
              value={mode}
              onValueChange={(value) => {
                setMode(value as TimerMode);
                setIsRunning(false);
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
                <TabsTrigger value="longBreak">Long Break</TabsTrigger>
              </TabsList>
              <TabsContent value="work" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-primary"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                        strokeDasharray="289.02652413026095"
                        strokeDashoffset={
                          289.02652413026095 * (1 - calculateProgress() / 100)
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shortBreak" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                        strokeDasharray="289.02652413026095"
                        strokeDashoffset={
                          289.02652413026095 * (1 - calculateProgress() / 100)
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="longBreak" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-blue-500"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="transparent"
                        r="46"
                        cx="50"
                        cy="50"
                        strokeDasharray="289.02652413026095"
                        strokeDashoffset={
                          289.02652413026095 * (1 - calculateProgress() / 100)
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={resetTimer}
              aria-label="Reset timer"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={toggleTimer}
              className="w-32"
              aria-label={isRunning ? "Pause timer" : "Start timer"}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PomodoroEmbedWidget;
