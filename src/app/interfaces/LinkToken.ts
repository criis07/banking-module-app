import { PlaidErrorResponse } from "./PlaidErrorResponse";

export interface LinkToken {
    expiration :string;
    link_token: string;
    request_id: string;
    error: PlaidErrorResponse | null;
  }