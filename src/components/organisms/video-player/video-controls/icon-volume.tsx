import React from 'react';
import {
  IconVolumeHigh,
  IconVolumeLow,
  IconVolumeSlash,
  IconVolumeVeryLow,
} from '@/assets';

interface VolumeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  isMuted: boolean;
  volume: number;
}

const getVolumeIcon = (isMuted: boolean, volume: number) => {
  if (isMuted) {
    return IconVolumeSlash;
  }
  if (volume <= 0.2) {
    return IconVolumeVeryLow;
  }
  if (volume <= 0.5) {
    return IconVolumeLow;
  }
  return IconVolumeHigh;
};

const IconVolume = ({
  className,
  volume,
  isMuted,
  ...otherProps
}: VolumeIconProps) => {
  const VolumeIcon = getVolumeIcon(isMuted, volume);
  return <VolumeIcon className={className} {...otherProps} />;
};

export default IconVolume;
