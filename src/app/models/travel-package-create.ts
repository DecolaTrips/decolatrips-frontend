import { AvailabilityCreate } from "./availability-create";
import { PackageMedia } from "./package-media";

export interface TravelPackageCreate {
title: string;
  description?: string;
  place?: string;
  country?: string;
  region?: string;
  typeTrip?: string;
  environment?: string;
  pdfItinerary?: string;
  durationDays: number;
  valorBase: number;
  availabilities: AvailabilityCreate[];
  images: PackageMedia[];
}
