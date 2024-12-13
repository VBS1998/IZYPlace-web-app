import { Listing } from "./listing";
import { Owner } from "./owner";
import RequestStatus from "./requestStatus";

export interface ListingRequest {
    id?: string;
    listing: Listing;
    owner: Owner;
    status?: RequestStatus;
  }
  