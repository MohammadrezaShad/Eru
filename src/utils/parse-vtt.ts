import { VideoThumbnailsData } from '@/contexts';

export const parseVttFile = (vttContent: string) => {
  const lines = vttContent.split('\n');
  const thumbData: VideoThumbnailsData[] = [];
  let currentData: Partial<VideoThumbnailsData> = {};

  lines.forEach((line, index) => {
    if (isEmptyOrHeader(line) || isLastLine(lines, index)) return;

    if (isTimestampLine(line)) {
      const [startTime, endTime] = parseTimestampLine(line);
      currentData = { startTime, endTime };
    } else {
      try {
        const { thumbnailUrl, x, y, width, height } = parseThumbnailLine(line);
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        thumbData.push({
          ...currentData,
          thumbnailUrl,
          x,
          y,
          width,
          height,
        } as VideoThumbnailsData);
        currentData = {};
        return thumbData;
      } catch (error) {
        console.error(`Error parsing line: ${line}`, error);
      }
    }
  });

  return thumbData;
};

const isEmptyOrHeader = (line: string) =>
  line.trim() === '' || line.trim() === 'WEBVTT';

const isLastLine = (lines: string[], index: number) =>
  index === lines.length - 1;

const isTimestampLine = (line: string) => line.includes('-->');

const parseTimestampLine = (line: string) =>
  line.split(' --> ').map((time) => parseTime(time.trim()));

const parseThumbnailLine = (line: string) => {
  const [thumbnailUrl, xywh] = line.split('#xywh=');
  const [x, y, width, height] = xywh.split(',').map(Number);
  return { thumbnailUrl: thumbnailUrl.trim(), x, y, width, height };
};

const parseTime = (timeString: string) => {
  const timeParts = timeString.split(':');
  let seconds = 0;

  if (timeParts.length === 3) {
    // HH:MM:SS.mmm format
    const [hours, minutes, secs] = timeParts;
    seconds =
      parseFloat(secs) +
      parseInt(minutes, 10) * 60 +
      parseInt(hours, 10) * 3600;
  } else if (timeParts.length === 2) {
    // MM:SS.mmm format
    const [minutes, secs] = timeParts;
    seconds = parseFloat(secs) + parseInt(minutes, 10) * 60;
  }

  return seconds;
};
