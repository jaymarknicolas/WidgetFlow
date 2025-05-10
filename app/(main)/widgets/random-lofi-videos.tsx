"use client";

import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

// List of popular lofi YouTube videos with their embed IDs
const LOFI_VIDEOS = [
  {
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio - beats to relax/study to",
    channel: "Lofi Girl",
  },
  {
    id: "5qap5aO4i9A",
    title: "lofi hip hop radio - beats to study/relax to",
    channel: "Lofi Girl",
  },
  {
    id: "DWcJFNfaw9c",
    title: "coffee shop radio // 24/7 lofi hip-hop beats",
    channel: "STEEZYASFUCK",
  },
  {
    id: "lTRiuFIWV54",
    title: "Chillhop Radio - jazzy & lofi hip hop beats",
    channel: "Chillhop Music",
  },
  {
    id: "7NOSDKb0HlU",
    title: "Study Music - 24/7 lofi hip hop beats",
    channel: "Lofi Zone",
  },
  {
    id: "n61ULEU7CO0",
    title: "Aesthetic Lofi Mix ~ Chill Beats to Study/Relax to",
    channel: "The Jazz Hop Café",
  },
];

interface YoutubeEmbedWidgetProps {
  placeholder?: string;
  initialVideoId?: string;
  showControls?: boolean;
  className?: string;
}

const RandomLofiYoutubeEmbedWidget = ({
  placeholder = "Loading lofi vibes...",
  initialVideoId,
  showControls = true,
}: YoutubeEmbedWidgetProps) => {
  const [currentVideoId, setCurrentVideoId] = useState<string>(
    initialVideoId || getRandomVideo().id
  );
  const [currentVideoInfo, setCurrentVideoInfo] = useState<{
    title: string;
    channel: string;
  } | null>(null);

  // Get a random video from the list
  function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * LOFI_VIDEOS.length);
    return LOFI_VIDEOS[randomIndex];
  }

  // Change to a new random video
  const changeVideo = () => {
    const newVideo = getRandomVideo();
    // Avoid selecting the same video twice in a row
    if (newVideo.id === currentVideoId && LOFI_VIDEOS.length > 1) {
      changeVideo();
      return;
    }
    setCurrentVideoId(newVideo.id);
    setCurrentVideoInfo({
      title: newVideo.title,
      channel: newVideo.channel,
    });
  };

  // Set initial video info on mount
  useEffect(() => {
    const initialVideo =
      LOFI_VIDEOS.find((v) => v.id === currentVideoId) || getRandomVideo();
    setCurrentVideoInfo({
      title: initialVideo.title,
      channel: initialVideo.channel,
    });
  }, [currentVideoId]);

  return (
    <div className="flex flex-col w-full rounded-lg overflow-hidden bg-background border shadow-sm h-full">
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=0&controls=${
            showControls ? 1 : 0
          }&rel=0`}
          className="absolute inset-0 w-full h-full"
          title={currentVideoInfo?.title || "Lofi YouTube Video"}
          aria-placeholder={placeholder}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {currentVideoInfo && (
        <div className="p-3 flex items-center justify-between">
          <div className="overflow-hidden">
            <h3 className="font-medium text-sm truncate">
              {currentVideoInfo.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {currentVideoInfo.channel}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={changeVideo}
            className="flex-shrink-0"
            title="Play random lofi video"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RandomLofiYoutubeEmbedWidget;
