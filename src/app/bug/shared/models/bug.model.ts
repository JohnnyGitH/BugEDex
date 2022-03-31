import { Month } from "./month.model";

/**
 * Main bug object
 */
export interface Bug {
    name: string;
    location: string;
    time: string;
    price: number;
    month: Month;
    caught?: boolean;
  }
