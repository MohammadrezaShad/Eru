import { VideoCarousel, ImageCarousel, MagCarousel } from '@/components';
import { Separator } from '@ui/separator';

import MoreDetails from './more-details';
import InfoBox from './info-box';
import Details from './details';
import Overview from './overview';
import Preview from './preview';
import Ratings from './ratings';
import Review from './review';
import SiteRating from './site-rating';
import CastAndCrew from './cast-and-crew';

export default function Multimedia() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <h1 className="text-2xl font-bold">سریال یک زندگی زیبا</h1>
      <div className="flex items-center justify-between">
        <Overview className="" />
        <SiteRating />
      </div>
      <Ratings className="-mt-2" />
      <Preview />
      <InfoBox />
      <VideoCarousel />
      <Separator className="bg-stroke-variant" />
      <ImageCarousel />
      <Separator className="bg-stroke-variant" />
      <CastAndCrew />
      <Details />
      <Review />
      <MoreDetails />
      <MagCarousel className="rounded-2xl bg-background-variant p-6" />
    </div>
  );
}
