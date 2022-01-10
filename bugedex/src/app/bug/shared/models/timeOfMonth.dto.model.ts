//TODO: Make Month Generic in the future once this gets working

/**
 * Integer representation of the month for northern hemisphere
 */
 export type Month = number
 export type NorthernHemisphereSchedule = Month[]
 /**
  * Integer representation of the month fo rsouther hemisphere
  */
 export type Month1 = number
 export type SouthernHemisphereSchedule = Month1[]

/**
 * time of month when this bug can be found
 */
 export interface TimeOfMonthDTO {
    north: NorthernHemisphereSchedule
    south: SouthernHemisphereSchedule
    //[k: string]: unknown
  }