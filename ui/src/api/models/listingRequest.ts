import { Listing } from "./listing";
import { Owner } from "./owner";

export interface ListingRequest {
    id: string;
    listing: Listing;
    onwer: Owner;
    status: RequestStatus;
  }
  