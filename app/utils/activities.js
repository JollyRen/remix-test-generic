import { activities } from './routes.js'
import { fetchWithAbort } from './index.js'

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
    const response = await fetchWithAbort(rGetActivities, 5000)
    //server error check
    // console.log(response)

    if (response.error) {
      return { activities: response }
    }

    const activities = await response.json()
    // console.log('activities', activities)
    // Array{
    //   id: int,
    //   name: string,
    //   description: string
    // }

    const error = {
      activities: {
        name: activities?.name || '',
        error: activities?.error || '',
        message: activities?.message || ''
      }
    }

    const success = { activities: { message: 'Found Activities', activities } }
    const unknownError = { activities: { message: 'No activities found', error: 'unknownError' } }

    if (activities?.error) return error
    //object {activities: {error: { name, error, message}}}
    if (!activities.length) return unknownError
    //object {activities: {message}}
    return success
    //object {activities: {message, activities: []}}
  } catch (error) {
    console.error(error)
    return { activities: { error, message: error.detail, name: 'fetchError' } }
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

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
    // console.log(activityId)
    // const rawRes = await fetch(rGetRoutinesByActivity(activityId))

    const rawRes = await fetchWithAbort(rGetRoutinesByActivity(Number(activityId)), 5000)
    //server error check
    // console.log(rawRes)

    if (rawRes.error) {
      return { routines: rawRes }
    }

    const routines = await rawRes.json()
    // console.log('routines by activityId', routines)
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
    //     routineActivityId: int,
    //     routineId: int
    //   }
    // }
    const error = {
      routines: {
        name: routines?.name || null,
        error: routines?.error || null,
        message: routines?.message || null
      }
    }
    const success = { routines: { message: 'Routines found', routines } }
    const unknownError = { routines: { message: 'No routines found', error: 'noRoutines' } }

    if (routines?.error) return error
    if (!routines) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}
