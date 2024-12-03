import { Listing } from "./listing";
import { Owner } from "./owner";

export interface Request {
    id: string;
    listing: Listing;
    onwer: Owner;
    status: RequestStatus;
  }
  