/* eslint-disable no-unused-vars */
import { cn } from '@/helpers';
import { Slider } from '@ui/slider';
import {
  Icon_5sMinus,
  Icon_5sPlus,
  IconFullscreen,
  IconMirroring,
  IconPlay,
  IconPause,
  IconSetting,
  IconCC,
  IconScreen,
} from '@/assets';
import { useVideoPlayerContext } from '@/contexts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Label } from '@ui/label';
import { CircleGauge } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React, { RefObject } from 'react';
import { formatTime } from '@/utils';
import Image from 'next/image';

import IconVolume from './icon-volume';

interface VideoControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSubtitles: () => void;
  onTimeChange: (value: number[]) => void;
  onPlayPause: () => void;
  onPictureInPicture: () => void;
  onVolumeUpdate: (value: number[]) => void;
  onMuteToggle: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onFullScreen: () => void;
  onChangeQuality: (level: number) => void;
  onSpeedChange: (value: number) => void;
  qualities: { value: number; label: string }[];
  onSliderHover: (event: React.MouseEvent<HTMLDivElement>) => void;
  onSliderTouch: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  onSliderLeave: () => void;
  progressTooltipRef: RefObject<HTMLDivElement>;
  progressBoxRef: RefObject<HTMLDivElement>;
}

export default function VideoControls({
  className,
  toggleSubtitles,
  onTimeChange,
  onPlayPause,
  onVolumeUpdate,
  onMuteToggle,
  onSkipBackward,
  onSkipForward,
  onPictureInPicture,
  onFullScreen,
  onChangeQuality,
  onSpeedChange,
  onSliderHover,
  onSliderLeave,
  qualities,
  progressBoxRef,
  progressTooltipRef,
  ...otherProps
}: VideoControlsProps) {
  const [videoState, setVideoState] = useVideoPlayerContext((ctx) => ctx);
  const thumbnailsSrc =
    'https://dl1.agiledownload.ir/video/5b51dfead9/thumbnails.jpg';
  const {
    isFullscreen,
    progress = 0,
    isPlaying,
    volume,
    isMuted,
    isPip,
    areSubtitlesVisible,
    bufferedProgress,
    totalDuration,
    currentTime,
    isControlsVisible,
    isSelectQualityOpen,
    isSelectSpeedOpen,
    currentLevel,
    speed,
    speeds,
    hoverTime,
    thumbnailsData,
  } = videoState;

  const thumbnailData = React.useMemo(() => {
    return hoverTime || hoverTime === 0
      ? thumbnailsData.find(
          (item) => item.startTime > hoverTime && hoverTime < item.endTime,
        )
      : null;
  }, [hoverTime, thumbnailsData]);

  const onOpenQualityMenuChange = (isOpen: boolean) =>
    setVideoState({ isSelectQualityOpen: isOpen });

  const onOpenSpeedMenuChange = (isOpen: boolean) =>
    setVideoState({ isSelectSpeedOpen: isOpen });

  const IconPlayOrPause = isPlaying ? IconPause : IconPlay;
  const IconFullscreenOrNot = isFullscreen ? IconScreen : IconFullscreen;

  console.log(thumbnailData, hoverTime, thumbnailsData);

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 h-16 translate-y-full bg-gradient-to-b from-black/0 to-black/85 transition-transform',
        isControlsVisible && 'translate-y-0',
        className,
      )}
      {...otherProps}
    >
      <div
        className="mx-8"
        ref={progressBoxRef}
        onMouseMove={onSliderHover}
        onMouseLeave={onSliderLeave}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0} open={true}>
            <TooltipTrigger asChild>
              <Slider
                min={1}
                max={100}
                value={[progress]}
                onValueChange={onTimeChange}
                bufferedValue={bufferedProgress}
              />
            </TooltipTrigger>
            {hoverTime ? (
              <TooltipContent ref={progressTooltipRef} align="center">
                <Image
                  src={thumbnailsSrc}
                  alt=""
                  width="160"
                  height="90"
                  unoptimized
                  className="mb-3 rounded-lg"
                  style={{
                    objectFit: 'none',
                    objectPosition: `-${thumbnailData?.x}px -${thumbnailData?.y}px`,
                  }}
                  objectFit="none"
                />
                <p className="text-center">{formatTime(hoverTime as number)}</p>
              </TooltipContent>
            ) : null}
          </Tooltip>
        </TooltipProvider>
        <div className="mt-4 flex flex-row-reverse items-center gap-6">
          <IconPlayOrPause
            className="cursor-pointer text-white hover:fill-current hover:text-primary"
            onClick={onPlayPause}
          />
          <Icon_5sMinus
            className="cursor-pointer text-white transition-colors hover:fill-current hover:text-primary"
            onClick={onSkipBackward}
          />
          <Icon_5sPlus
            className="cursor-pointer text-white transition-colors hover:fill-current hover:text-primary"
            onClick={onSkipForward}
          />
          <div className="-mx-3">
            <div className="group flex flex-row-reverse items-center gap-2 px-3">
              <IconVolume
                className="h-6 w-6 cursor-pointer text-white transition-colors hover:fill-current hover:text-primary"
                onClick={onMuteToggle}
                isMuted={isMuted}
                volume={volume}
              />
              <div className="w-0 transition-[margin,width] duration-200 ease-in group-hover:ml-1 group-hover:w-20 group-hover:ease-out">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={onVolumeUpdate}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
          </div>
          <span className="-mx-1 h-[18px]">
            {totalDuration} / {currentTime || '00:00'}
          </span>
          <div className="flex-1"></div>
          <IconMirroring
            className={cn(
              'cursor-pointer text-white transition-colors hover:fill-current hover:text-primary',
              isPip && '[&>path]:fill-primary',
            )}
            onClick={onPictureInPicture}
          />
          <IconCC
            className={cn(
              'w-6 cursor-pointer text-white transition-colors hover:fill-current hover:text-primary',
              areSubtitlesVisible && '[&>path]:fill-primary',
            )}
            onClick={toggleSubtitles}
          />
          <DropdownMenu onOpenChange={onOpenQualityMenuChange} dir="rtl">
            <DropdownMenuTrigger asChild>
              <IconSetting
                className={cn(
                  'cursor-pointer text-white transition-colors hover:fill-current hover:text-primary',
                  isSelectQualityOpen && 'fill-current text-primary',
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72"
              side="top"
              align="start"
              sideOffset={30}
            >
              <DropdownMenuLabel className="mb-6">
                تغییر کیفیت
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <RadioGroup
                  dir="rtl"
                  value={`${currentLevel}`}
                  onValueChange={(value) => onChangeQuality(Number(value))}
                >
                  {qualities.map((level) => {
                    return (
                      <DropdownMenuItem key={`${level.value}`}>
                        <RadioGroupItem
                          value={`${level.value}`}
                          id={`${level.value}`}
                        />
                        <Label htmlFor={`${level.value}`} className="mr-3">
                          {level.label}
                        </Label>
                      </DropdownMenuItem>
                    );
                  })}
                </RadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu onOpenChange={onOpenSpeedMenuChange} dir="rtl">
            <DropdownMenuTrigger asChild>
              <CircleGauge
                className={cn(
                  'cursor-pointer text-white transition-colors hover:stroke-primary',
                  isSelectSpeedOpen && 'stroke-primary',
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72"
              side="top"
              align="start"
              sideOffset={30}
            >
              <DropdownMenuLabel className="mb-6">سرعت پخش</DropdownMenuLabel>
              <DropdownMenuGroup>
                <RadioGroup
                  dir="rtl"
                  value={`${speed}`}
                  onValueChange={(value) => onSpeedChange(Number(value))}
                >
                  {speeds.map((speedItem) => {
                    return (
                      <DropdownMenuItem key={`${speedItem}`}>
                        <RadioGroupItem
                          value={`${speedItem}`}
                          id={`${speedItem}`}
                        />
                        <Label htmlFor={`${speedItem}`} className="mr-3">
                          {speedItem}
                        </Label>
                      </DropdownMenuItem>
                    );
                  })}
                </RadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <IconFullscreenOrNot
            className="cursor-pointer text-white transition-colors hover:fill-current hover:text-primary"
            onClick={onFullScreen}
          />
        </div>
      </div>
    </div>
  );
}
