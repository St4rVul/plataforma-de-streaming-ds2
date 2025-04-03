import React from "react";

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="aspect-w-16 aspect-h-9">
        <video
          className="w-full h-full rounded-lg shadow-lg"
          controls
          src={url}
        >
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
