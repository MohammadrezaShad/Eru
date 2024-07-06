'use client';

import { cn } from '@/helpers';
import { LoaderCircle } from 'lucide-react';

import { useVideoPlayer } from './use-video-player';
import VideoControls from './video-controls';
export interface VideoPlayerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function VideoPlayer({ className }: VideoPlayerProps) {
  const src = 'https://dl1.agiledownload.ir/video/5b51dfead9/master.m3u8';
  const vttFile =
    'https://dl1.agiledownload.ir/video/5b51dfead9/thumbnails.vtt';
  const {
    handlePlayPause,
    toggleSubtitles,
    handleTimeUpdate,
    handleVolumeUpdate,
    handleSkipBackward,
    handleSkipForward,
    handleToggleMute,
    handlePictureInPicture,
    handleFullscreen,
    handleChangeQuality,
    handleSpeedChange,
    handleSliderHover,
    handleSliderTouch,
    handleTouchStart,
    handleTouchEnd,
    handleSliderLeave,
    videoRef,
    progressBoxRef,
    progressTooltipRef,
    fullScreenVideoRef,
    qualities,
    videoState: { isMetaLoaded, showLoading },
  } = useVideoPlayer(src, vttFile);

  return (
    <div
      className={cn('relative overflow-hidden bg-black', className)}
      ref={fullScreenVideoRef}
    >
      {!isMetaLoaded || showLoading ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
          <LoaderCircle className="h-20 w-20  animate-spin text-primary" />
        </div>
      ) : null}
      <video
        onClick={handlePlayPause}
        ref={videoRef}
        key={src}
        crossOrigin="anonymous"
        className="w-full"
      />
      <VideoControls
        onPictureInPicture={handlePictureInPicture}
        toggleSubtitles={toggleSubtitles}
        onTimeChange={handleTimeUpdate}
        onPlayPause={handlePlayPause}
        onVolumeUpdate={handleVolumeUpdate}
        onMuteToggle={handleToggleMute}
        onSkipBackward={handleSkipBackward}
        onSkipForward={handleSkipForward}
        onFullScreen={handleFullscreen}
        onChangeQuality={handleChangeQuality}
        onSpeedChange={handleSpeedChange}
        onSliderHover={handleSliderHover}
        onSliderTouch={handleSliderTouch}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onSliderLeave={handleSliderLeave}
        qualities={qualities}
        progressBoxRef={progressBoxRef}
        progressTooltipRef={progressTooltipRef}
      />
    </div>
  );
}
