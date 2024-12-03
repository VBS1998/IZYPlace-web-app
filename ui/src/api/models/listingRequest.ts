import { Listing } from "./listing";
import { Owner } from "./owner";

export interface ListingRequest {
    id?: string;
    listing: Listing;
    owner: Owner;
    status?: RequestStatus;
  }
  