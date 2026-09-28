"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, RotateCcw, Maximize, Mouse, ChevronDown, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoShowcase() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignore auto-play blocking errors
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 } // Triggers when at least 30% of the video is visible
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current as any;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) { // iOS Safari specific
        video.webkitEnterFullscreen();
      } else if (video.webkitRequestFullscreen) { // other webkit
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div id="main-video" className="video-stage w-full max-w-6xl mx-auto px-5 sm:px-8 mb-28 relative md:max-w-none md:w-full md:px-8 lg:px-12 md:py-24 md:mb-0 md:h-[calc(100vh-4rem)] md:snap-start md:scroll-mt-16 group">
      <div className="absolute left-5 right-5 top-9 hidden items-center justify-between pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#a4a4a4] md:flex md:left-8 md:right-8 lg:left-12 lg:right-12">
        <span>01 / Inside Jennefer</span><span>Product film / Overview</span>
      </div>
      <div className="relative aspect-video w-full rounded-md overflow-hidden bg-[#050505] border border-[#cdcdcd]/20 shadow-[0_30px_90px_rgba(0,0,0,0.4)] transition-all duration-700 md:h-full md:aspect-auto">
        
        <video 
          ref={videoRef}
          src="https://jenneferstorage.blob.core.windows.net/media/jennefer-advertisement-trailer.mp4" 
          muted={isMuted}
          playsInline
          preload="none"
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(false)}
          className="w-full h-full object-cover"
        />
        <div className="pointer-events-none absolute left-5 top-5 z-10 border border-white/20 bg-[#101010]/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#e4e4e4] backdrop-blur-md sm:left-8 sm:top-8">
          The workspace / In motion
        </div>

        {/* End / Paused State Overlay */}
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={togglePlay}
              className="absolute inset-0 z-10 bg-black/50 backdrop-blur-lg flex flex-col items-center justify-center cursor-pointer group/overlay"
            >
              <div className="w-20 h-20 bg-white/10 group-hover/overlay:bg-white/20 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-10 transition-all duration-300 group-hover/overlay:scale-110 shadow-2xl">
                <Play className="w-10 h-10 text-white fill-white ml-2" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <Mouse className="w-7 h-7 text-white/60" />
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5 text-zinc-200/80" />
                </motion.div>
                <span className="text-white/70 font-medium tracking-wide mt-1 text-sm">Scroll to explore more</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Controls Layer */}
      <div className="flex justify-center mt-4 md:mt-0 md:absolute md:bottom-32 md:left-1/2 md:-translate-x-1/2">
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:shadow-2xl">
          <button 
            onClick={togglePlay}
            className="p-2 sm:p-2.5 rounded-full hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
          </button>

          <div className="w-px h-5 sm:h-6 bg-white/20 mx-1 sm:mx-2" />

          <button 
            onClick={handleRestart}
            className="p-2 sm:p-2.5 rounded-full hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            title="Restart Video"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="w-px h-5 sm:h-6 bg-white/20 mx-1 sm:mx-2" />

          <button 
            onClick={toggleMute}
            className="p-2 sm:p-2.5 rounded-full hover:bg-white/20 text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold pr-1">Unmute</span>
              </>
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          <div className="w-px h-5 sm:h-6 bg-white/20 mx-1 sm:mx-2 md:hidden" />

          <button 
            onClick={handleFullscreen}
            className="p-2 sm:p-2.5 rounded-full hover:bg-white/20 text-zinc-300 hover:text-white transition-colors flex items-center gap-2 md:hidden"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-semibold pr-1">Fullscreen</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-5 right-5 hidden items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#a4a4a4] md:flex md:left-8 md:right-8 lg:left-12 lg:right-12">
        <span>See the product before the details</span><span>↓ Scroll to continue</span>
      </div>
    </div>
  );
}
