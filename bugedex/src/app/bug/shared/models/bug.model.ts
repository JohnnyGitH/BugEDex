import { TimeOfMonth } from "./timeOfMonth.model"

/**
 * Name of the bug
 */
export type BugName = string
/**
 * Where this bug can be found
 */
export type BugSLocation = string
/**
 * Time of day when this bug can be found
 */
export type TimeOfDay = string
/**
 * Price of bug
 */
export type BugSPrice = number

/**
 * Main bug object
 */
export interface Bug {
    name: BugName
    location: BugSLocation
    time: TimeOfDay
    price: BugSPrice
    month: TimeOfMonth
    //[k: string]: unknown
  }