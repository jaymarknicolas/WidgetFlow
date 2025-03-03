import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formatUrl = (url: string) => {
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }

  const videoMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);

  if (playlistMatch) {
    return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`;
  } else if (videoMatch) {
    return `https://www.youtube.com/embed/${videoMatch[1]}`;
  }

  return url;
};
