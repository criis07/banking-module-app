import { PlaidErrorResponse } from "./PlaidErrorResponse";


export interface AccessTokenResponse {
  access_token: string;
  item_id: string;
  request_id: string;
  error: PlaidErrorResponse | null;
}

