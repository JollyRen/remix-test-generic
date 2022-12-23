import {
  getActivities,
  getRoutinesByActivity,
  createActivity,
  updateActivity // formatting
} from './activities'

import {
  getRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  attachActToRoutine
} from './routines'

import {
  getUser,
  getUserPubRoutines,
  regOrLoginUser //formatting
} from './users'

import { updateRA, deleteRA } from './ra'

import { fetchWithAbort } from './fetchHelpers'

import navlinks from './navlinks'

export {
  navlinks,
  fetchWithAbort,
  getActivities,
  getRoutinesByActivity,
  createActivity,
  updateActivity,
  getRoutines,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  attachActToRoutine,
  getUser,
  getUserPubRoutines,
  regOrLoginUser,
  updateRA,
  deleteRA
}
