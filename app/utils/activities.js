import { activities } from './routes.js'

const {
  rGetActivities,
  rGetRoutinesByActivity, //fn (activityId)
  rCreateActivity,
  rUpdateActivity //fn (activityId)
} = activities

// error: { name: string, error: string, message: string }
// if (res.error){
// const { name, error, message } = res
// return { name, error, message }
// }

export const getActivities = async () => {
  try {
    const response = await fetch(rGetActivities)
    const activities = await response.json()
    console.log('activities', activities)
    // Array{
    //   id: int,
    //   name: string,
    //   description: string
    // }

    const error = {
      name: activities?.name || null,
      error: activities?.error || null,
      message: activities?.message || null
    }
    const success = { message: 'Found Activities', activities }
    const unknownError = { message: 'No activities found' }

    if (activities?.error) return error //object
    if (activities) return success //array{}
    return unknownError //object
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const createActivity = async ({ name, description }) => {
  try {
    const body = {
      name,
      description
    }

    const req = {
      method: 'POST',
      body: JSON.stringify(body)
    }

    const rawRes = await fetch(rCreateActivity, req)
    const createdActivity = await rawRes.json()
    console.log('created activity', createdActivity)
    // Object: {
    //   id: int,
    //   name: string,
    //   description: string
    // }
    const error = {
      name: createdActivity?.name || null,
      error: createdActivity?.error || null,
      message: createdActivity?.message || null
    }
    const success = { message: 'Activity Created', activity: createdActivity }
    const unknownError = { message: 'No activity created' }

    if (createdActivity?.error) return error
    if (createdActivity && Object.keys(createdActivity).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const updateActivity = async ({ name = null, description = null, activityId }) => {
  try {
    const body = JSON.stringify({ name, description })
    const req = { method: 'PATCH', body }

    const rawRes = await fetch(rUpdateActivity(activityId), req)
    const updatedActivity = await rawRes.json()
    console.log('updated activity', updatedActivity)
    //Object {
    //   id: int,
    //   name: string,
    //   description: string
    // }

    const error = {
      name: updatedActivity?.name || null,
      error: updatedActivity?.error || null,
      message: updatedActivity?.message || null
    }
    const success = { message: 'Activity Updated', activity: updatedActivity }
    const unknownError = { message: 'Failed to update activity' }

    if (updatedActivity?.error) return error
    if (updatedActivity && Object.keys(updatedActivity).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const getRoutinesByActivity = async ({ activityId }) => {
  try {
    const rawRes = await fetch(rGetRoutinesByActivity(activityId))
    const routines = await rawRes.json()
    console.log('routines by activityId', routines)
    //Array {
    //   id: int,
    //   creatorID: int,
    //   isPublic: bool,
    //   name: string,
    //   goal: string,
    //   creatorName: string,
    //   activities: Array{
    //     id: int,
    //     name: string,
    //     description: string,
    //     duration: 8,
    //     count: int,
    //     routineActifityId: int,
    //     routineId: int
    //   }
    // }
    const error = {
      name: routines?.name || null,
      error: routines?.error || null,
      message: routines?.message || null
    }
    const success = { message: 'Routines found', routines }
    const unknownError = { message: 'No routines found' }

    if (routines?.error) return error
    if (routines) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}
