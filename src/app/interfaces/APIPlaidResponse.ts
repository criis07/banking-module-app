import { PlaidErrorResponse } from "./PlaidErrorResponse";

export interface APIPlaidResponse<T> {
    success: boolean;
    data: T;
    error: PlaidErrorResponse | null;
  }