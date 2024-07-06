/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {
  VideoState,
  VideoThumbnailsData,
  useVideoPlayerContext,
} from '@/contexts';
import { formatTime, parseVttFile } from '@/utils';
import Hls from 'hls.js';
import React, { useCallback, useMemo, useRef } from 'react';

export const useVideoPlayer = (src: string, thumbnailsMapSrc?: string) => {
  const [videoState, setVideoState] = useVideoPlayerContext((ctx) => ctx);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const fullScreenVideoRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const progressBoxRef = useRef<HTMLDivElement>(null);
  const progressTooltipRef = useRef<HTMLDivElement>(null);

  const thumbnailData = useMemo(() => {
    const { hoverTime, thumbnailsData } = videoState;

    const isHoverTimeValid = hoverTime !== undefined && hoverTime !== null;

    const thumbnailData = isHoverTimeValid
      ? thumbnailsData.find(
          ({ startTime, endTime }) =>
            hoverTime >= startTime && hoverTime < endTime,
        )
      : null;

    return thumbnailData as VideoThumbnailsData;
  }, [videoState]);

  const qualities = useMemo(() => {
    const { levels } = videoState;

    const hlsLevels = levels.map((level, value) => {
      const label: string = level.name || level.label || `${level.height}p`;
      return {
        value,
        label,
      };
    });
    hlsLevels.unshift({ label: 'خودکار', value: -1 });

    return hlsLevels;
  }, [videoState]);

  const initializeHls = useCallback(() => {
    if (!src) return;

    if (Hls.isSupported()) {
      hlsRef.current = new Hls();
      hlsRef.current.loadSource(src);
      hlsRef.current.attachMedia(videoRef.current as HTMLMediaElement);

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const { subtitleTracks } = data;
        if (subtitleTracks.length > 0 && hlsRef.current) {
          hlsRef.current.subtitleTrack = subtitleTracks[0].id;

          // Show or hide subtitles by default
          const videoElement = videoRef.current as HTMLVideoElement;
          const textTracks = videoElement.textTracks;
          for (let i = 0; i < textTracks.length; i++) {
            textTracks[i].mode = 'showing'; // or 'disabled'
          }
        }

        setVideoState({
          levels: data.levels,
          currentLevel: hlsRef.current?.currentLevel,
        });
      });
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        const textTracks = Array.from(
          videoRef.current?.textTracks as ArrayLike<TextTrack>,
        );
        const AUTO_QUALITY_LEVEL = -1;

        // Show or hide subtitles by default
        for (let i = 0; i < textTracks.length; i++) {
          textTracks[i].mode = 'showing'; // or 'disabled'
        }

        setVideoState({
          levels: textTracks,
          currentLevel: AUTO_QUALITY_LEVEL,
        });
      });
    }
  }, [setVideoState, src]);

  const destroyHls = () => {
    hlsRef.current?.destroy();
    hlsRef.current = null;
  };

  const updateBufferedProgress = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    if (videoElement.buffered.length <= 0) return;
    const buffered = videoElement.buffered.end(0);
    const nextBufferedProgress = (buffered / videoElement.duration) * 100;
    setVideoState({ bufferedProgress: nextBufferedProgress });
  }, [setVideoState]);

  const handleMetadataLoaded = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const formattedTotalDuration = formatTime(videoElement.duration);
    setVideoState({
      showLoading: false,
      totalDuration: formattedTotalDuration,
      isControlsVisible: true,
      isMetaLoaded: true,
      state: VideoState.LOADED,
    });
  }, [setVideoState]);

  const handleCurrentTimeTimeUpdate = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const formattedCurrentTime = formatTime(videoElement.currentTime);
    setVideoState({
      currentTime: formattedCurrentTime,
      progress: (videoElement.currentTime / videoElement.duration) * 100,
    });
  }, [setVideoState]);

  const handleWaiting = useCallback(() => {
    setVideoState({
      showLoading: true,
      state: VideoState.WAITING,
    });
  }, [setVideoState]);

  const handlePlaying = useCallback(() => {
    setVideoState({
      showLoading: false,
      state: VideoState.PLAYING,
    });
  }, [setVideoState]);

  const handlePause = useCallback(() => {
    setVideoState({
      state: VideoState.PAUSED,
    });
  }, [setVideoState]);

  const handleVideoEnd = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    videoElement.currentTime = 0;
    setVideoState({
      isPlaying: false,
      state: VideoState.ENDED,
    });
  }, [setVideoState]);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current as HTMLVideoElement;
    setVideoState({
      progress: (video.currentTime / video.duration) * 100,
    });
  }, [setVideoState]);

  const handleTimeUpdate = useCallback(
    (value: number[]) => {
      const videoElement = videoRef.current as HTMLVideoElement;
      const currTime = (value[0] / 100) * videoElement.duration;
      videoElement.currentTime = currTime;
      const formattedCurrentTime = formatTime(currTime);
      console.log(formattedCurrentTime);
      setVideoState({
        currentTime: formattedCurrentTime,
        progress: value[0],
      });
    },
    [setVideoState],
  );

  const handlePlayPause = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;

    if (videoElement.paused) {
      videoElement.play();
      videoElement.playbackRate = videoState.speed;
      videoElement.muted = videoState.isMuted;
      setVideoState({ isPlaying: true });
    } else {
      videoElement.pause();
      setVideoState({ isPlaying: false });
    }
  }, [setVideoState, videoState.isMuted, videoState.speed]);

  const handleFullscreen = useCallback(() => {
    const videoParentElement = fullScreenVideoRef.current;
    if (!videoParentElement) return;

    const isFullScreenEnabled = () => {
      return (
        document.fullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
    };

    const requestFullScreen = (element: any) => {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };

    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    };

    if (isFullScreenEnabled()) {
      exitFullScreen();
    } else {
      requestFullScreen(videoParentElement);
    }
  }, []);

  const handleSpeedChange = useCallback(
    (value: number) => {
      const selectedSpeed = value;
      setVideoState({ speed: selectedSpeed });
      (videoRef.current as HTMLVideoElement).playbackRate = selectedSpeed;
    },
    [setVideoState],
  );

  const handleChangeQuality = React.useCallback(
    (level: number) => {
      if (hlsRef.current) {
        hlsRef.current.currentLevel = level;
      } else if (
        videoRef.current?.canPlayType('application/vnd.apple.mpegurl')
      ) {
        const videoElement = videoRef.current as HTMLVideoElement;
        const tracks = Array.from(videoElement.textTracks);

        tracks.forEach((track, index) => {
          track.mode = level === index ? 'showing' : 'disabled';
        });
      }
      setVideoState({
        currentLevel: level,
      });
    },
    [setVideoState],
  );

  const handleVolumeUpdate = useCallback(
    (value: number[]) => {
      const videoElement = videoRef.current as HTMLVideoElement;
      const selectedVolume = value[0];
      const isMuted = selectedVolume === 0;
      setVideoState({
        volume: selectedVolume,
        isMuted,
      });
      videoElement.volume = selectedVolume;
      videoElement.muted = isMuted;
    },
    [setVideoState],
  );

  const handleToggleMute = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const isMuted = !videoElement.muted;
    videoElement.muted = isMuted;
    setVideoState({ isMuted });
  }, [setVideoState]);

  const toggleSubtitles = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    const textTracks = videoElement.textTracks;

    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode =
        textTracks[i].mode === 'showing' ? 'disabled' : 'showing';
    }
    console.log({ textTracks });
    setVideoState({
      areSubtitlesVisible: textTracks[0].mode === 'showing',
    });
  }, [setVideoState]);

  const changeSubtitlePosition = useCallback(
    (position: number | string) => {
      const videoElement = videoRef.current as HTMLVideoElement;
      const textTracks = videoElement.textTracks;

      for (let i = 0; i < textTracks.length; i++) {
        for (let j = 0; j < (textTracks[i].cues?.length || 0); j++) {
          const cue = textTracks?.[i].cues?.[j] as VTTCue;
          if (cue) {
            cue.line = position as number;
          }
        }
      }

      setVideoState({
        subtitlePosition: position,
      });
    },
    [setVideoState],
  );

  const handleSkipForward = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    videoElement.currentTime = Math.min(
      videoElement.currentTime + 5,
      videoElement.duration,
    );
    setVideoState({
      currentTime: formatTime(videoElement.currentTime),
      progress: (videoElement.currentTime / videoElement.duration) * 100,
    });
  }, [setVideoState]);

  const handleSkipBackward = useCallback(() => {
    const videoElement = videoRef.current as HTMLVideoElement;
    videoElement.currentTime = Math.max(videoElement.currentTime - 5, 0);
    setVideoState({
      currentTime: formatTime(videoElement.currentTime),
      progress: (videoElement.currentTime / videoElement.duration) * 100,
    });
  }, [setVideoState]);

  const handlePictureInPicture = useCallback(async () => {
    const videoElement = videoRef.current as HTMLVideoElement;

    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoElement.requestPictureInPicture();
    }
  }, []);

  const handleEnterPictureInPicture = useCallback(() => {
    setVideoState({
      isPip: true,
    });
  }, [setVideoState]);

  const handleLeavePictureInPicture = useCallback(() => {
    setVideoState({
      isPip: false,
    });
  }, [setVideoState]);

  const handleFullscreenChange = useCallback(() => {
    const isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
    console.log(isFullscreen);
    setVideoState({
      isFullscreen,
    });
  }, [setVideoState]);

  const startHideControlsTimer = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    hideControlsTimeoutRef.current = setTimeout(() => {
      if (!videoState.isPlaying || videoState.isSelectQualityOpen) return;
      setVideoState({ isControlsVisible: false });
    }, 3000);
  }, [setVideoState, videoState.isPlaying, videoState.isSelectQualityOpen]);

  const handleUserActivity = useCallback(() => {
    if (!videoState.isControlsVisible) {
      setVideoState({ isControlsVisible: true });
    }
    startHideControlsTimer();
  }, [setVideoState, startHideControlsTimer, videoState.isControlsVisible]);

  const handleSliderInteraction = async (
    clientX: number,
    isTouch: boolean = false,
  ) => {
    const target = progressBoxRef.current as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const pos = (clientX - rect.left) / rect.width;
    const hoverPosition = clientX - rect.left;
    const hoverProgress = (hoverPosition / rect.width) * 100;
    const duration = videoRef.current?.duration || 0;
    const finalProgress = Math.max(0, hoverProgress);
    const progressBoxWidth = target.clientWidth;
    const progressTooltipWidth = progressTooltipRef.current?.clientWidth || 0;
    const gap = progressTooltipWidth / (2 * progressBoxWidth);
    const newPos = Math.min(Math.max(pos - gap, 0), 1 - gap);
    const liveHoverTime = (duration * finalProgress) / 100;

    setVideoState({
      position: newPos,
      hoverTime: liveHoverTime,
    });

    if (isTouch) {
      setVideoState({
        isTouching: true,
      });
    }
  };

  const handleSliderHover = (event: React.MouseEvent<HTMLDivElement>) => {
    handleSliderInteraction(event.clientX);
  };

  const handleSliderTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    handleSliderInteraction(event.touches[0].clientX, true);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const clientX = event.touches[0].clientX;
    const rect = (
      progressBoxRef.current as HTMLDivElement
    ).getBoundingClientRect();
    if (clientX >= rect.left && clientX <= rect.right) {
      handleSliderInteraction(clientX, true);
    }
  };

  const handleTouchEnd = () => {
    setVideoState({
      isTouching: false,
      hoverTime: null,
    });
  };

  const handleSliderLeave = () => {
    setVideoState({
      hoverTime: null,
    });
  };

  React.useEffect(() => {
    if (!thumbnailsMapSrc) return;
    const loadVtt = async () => {
      const response = await fetch(thumbnailsMapSrc);
      const vttContent = await response.text();
      const videoThumbnailsData = parseVttFile(vttContent);
      setVideoState({ thumbnailsData: videoThumbnailsData });
    };
    loadVtt();
  }, [setVideoState, thumbnailsMapSrc]);

  React.useEffect(() => {
    initializeHls();

    return () => {
      destroyHls();
    };
  }, [initializeHls, src]);

  React.useEffect(() => {
    const videoElement = videoRef.current as HTMLVideoElement;

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    videoElement.addEventListener('progress', updateBufferedProgress);
    videoElement.addEventListener('loadedmetadata', handleMetadataLoaded);
    videoElement.addEventListener('timeupdate', handleCurrentTimeTimeUpdate);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleVideoEnd);
    videoElement.addEventListener(
      'enterpictureinpicture',
      handleEnterPictureInPicture,
    );
    videoElement.addEventListener(
      'leavepictureinpicture',
      handleLeavePictureInPicture,
    );

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
      videoElement.removeEventListener('progress', updateBufferedProgress);
      videoElement.removeEventListener('loadedmetadata', handleMetadataLoaded);
      videoElement.removeEventListener(
        'timeupdate',
        handleCurrentTimeTimeUpdate,
      );
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleVideoEnd);
      videoElement.removeEventListener(
        'enterpictureinpicture',
        handleEnterPictureInPicture,
      );
      videoElement.removeEventListener(
        'leavepictureinpicture',
        handleLeavePictureInPicture,
      );
    };
  }, [
    updateBufferedProgress,
    handleMetadataLoaded,
    handleCurrentTimeTimeUpdate,
    handleWaiting,
    handlePlaying,
    handlePause,
    handleVideoEnd,
    handleEnterPictureInPicture,
    handleLeavePictureInPicture,
    handleFullscreenChange,
  ]);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    document.addEventListener('touchstart', handleUserActivity);

    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      document.removeEventListener('touchstart', handleUserActivity);
    };
  }, [handleUserActivity]);

  return {
    videoState,
    thumbnailData,
    qualities,
    setVideoState,
    onTimeUpdate,
    handleFullscreen,
    handleSpeedChange,
    handleVolumeUpdate,
    handleToggleMute,
    handleTimeUpdate,
    handlePlayPause,
    toggleSubtitles,
    changeSubtitlePosition,
    handleSkipForward,
    handleSkipBackward,
    handlePictureInPicture,
    handleChangeQuality,
    handleSliderHover,
    handleSliderTouch,
    handleTouchStart,
    handleTouchEnd,
    handleSliderLeave,
    videoRef,
    hlsRef,
    fullScreenVideoRef,
    progressBoxRef,
    progressTooltipRef,
  };
};
