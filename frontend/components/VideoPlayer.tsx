import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  subtitles?: Array<{
    src: string;
    label: string;
    srclang: string;
  }>;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  subtitles,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        fluid: true,
        responsive: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [
          {
            src,
            type: "application/x-mpegURL",
          },
        ],
        poster,
        title,
        tracks: subtitles?.map((subtitle) => ({
          kind: "subtitles",
          src: subtitle.src,
          label: subtitle.label,
          srclang: subtitle.srclang,
        })),
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src, poster, title, subtitles]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
