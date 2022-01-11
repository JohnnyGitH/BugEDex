import { MonthDTO } from "./month.dto.model";
 /**
  * Main bug object
  */
 export interface BugDTO {
     name: string;
     location: string;
     time: string;
     price: number;
     month: MonthDTO;
   }