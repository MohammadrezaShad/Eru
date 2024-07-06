'use client';

import { createFastContext } from '@/store';

export enum VideoState {
  WAITING = 'WAITING',
  LOADED = 'LOADED',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
}

export interface VideoThumbnailsData {
  startTime: number;
  endTime: number;
  thumbnailUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type VideoPlayerContextType = {
  state: VideoState;
  isFullscreen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  levels: any[];
  currentLevel: number;
  progress: number;
  bufferedProgress: number;
  totalDuration: string;
  currentTime: string;
  isPlaying: boolean;
  isMuted: boolean;
  isControlsVisible: boolean;
  showLoading: boolean;
  isMetaLoaded: boolean;
  speed: number;
  volume: number;
  showControls: boolean;
  hoverTime: number | null;
  position: number | null;
  thumbnailsData: VideoThumbnailsData[];
  isTouching: boolean;
  areSubtitlesVisible: boolean;
  subtitlePosition: string | number;
  isPip: boolean;
  isSelectQualityOpen: boolean;
  isSelectSpeedOpen: boolean;
  speeds: number[];
};

export type VideoQualityLevel = {
  id: number;
  label: string;
  bitrate: number;
  resolution: { width: number; height: number };
};

const initialState: VideoPlayerContextType = {
  state: VideoState.WAITING,
  isFullscreen: false,
  levels: [],
  currentLevel: -1,
  progress: 0,
  bufferedProgress: 0,
  totalDuration: '',
  currentTime: '',
  isPlaying: false,
  isMuted: false,
  isControlsVisible: true,
  showLoading: true,
  isMetaLoaded: false,
  speed: 1,
  volume: 1,
  showControls: true,
  hoverTime: null,
  position: null,
  thumbnailsData: [],
  isTouching: false,
  speeds: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  areSubtitlesVisible: true,
  subtitlePosition: 'auto',
  isPip: false,
  isSelectQualityOpen: false,
  isSelectSpeedOpen: false,
};

const {
  Provider: VideoPlayerProvider,
  useStoreContext: useVideoPlayerContext,
} = createFastContext<VideoPlayerContextType>(initialState);

export { useVideoPlayerContext, VideoPlayerProvider };
