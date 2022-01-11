
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
 export interface TimeOfMonth {
    north: NorthernHemisphereSchedule
    south: SouthernHemisphereSchedule
  }

  /**
   * 
   * interface month
   * north:number[]
   * south:number[]
   */