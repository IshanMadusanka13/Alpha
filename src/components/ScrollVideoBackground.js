'use client';
import { useEffect, useRef, useState, useCallback } from 'react';


const ScrollVideoBackground = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const lastScrollY = useRef(0);
  const animationFrame = useRef(null);


  // Ultra-smooth direct mapping approach
  const updateVideoTimeDirect = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isVideoLoaded || !video.duration) return;


    const currentScrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
   
    if (maxScroll <= 0) return;


    // Direct mapping - no interpolation for ultra-responsive feel
    const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
    const newTime = scrollProgress * video.duration;
   
    // Set time directly for immediate response
    video.currentTime = newTime;
   
    // Ensure video stays paused
    if (!video.paused) {
      video.pause();
    }


    lastScrollY.current = currentScrollY;
  }, [isVideoLoaded]);


  const handleScroll = useCallback(() => {
    // Cancel previous frame
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
   
    // Use requestAnimationFrame for smooth 60fps updates
    animationFrame.current = requestAnimationFrame(updateVideoTimeDirect);
  }, [updateVideoTimeDirect]);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      setDebugInfo('Video ref not found');
      return;
    }


    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
      setDebugInfo(`Video loaded: ${video.duration}s duration`);
      video.currentTime = 0;
      video.pause();
    };


    const handleError = (e) => {
      console.error('Video error:', e);
      setVideoError(e.target.error);
      setDebugInfo(`Error: ${e.target.error?.message || 'Unknown error'}`);
    };


    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    window.addEventListener('scroll', handleScroll, { passive: true });


    lastScrollY.current = window.scrollY;
    video.load();


    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
     
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleScroll]);


  return (
    <>
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-75 text-white p-2 text-xs">
          <div>Video Status: {isVideoLoaded ? 'Loaded ✅' : 'Loading...'}</div>
          <div>Debug: {debugInfo}</div>
          <div>Scroll: {Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%</div>
          <div>Video Time: {videoRef.current?.currentTime?.toFixed(2)}s</div>
          {videoError && <div className="text-red-400">Error: {videoError.message}</div>}
        </div>
      )}
     
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full overflow-hidden"
        style={{ zIndex: -2 }}
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{
            transform: 'translate3d(0, 0, 0)',
            filter: 'brightness(0.8) contrast(1.1)',
            willChange: 'transform',
            zIndex: -2,
          }}
        >
          <source src="/background-3d.mp4" type="video/mp4" />
          <source src="/videos/background-3d.mp4" type="video/mp4" />
          <source src="/videos/background-3d.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
       
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
            zIndex: -1,
          }}
        />
      </div>
    </>
  );
};


export default ScrollVideoBackground;