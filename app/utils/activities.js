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

    const success = {
      activities: {
        name: 'foundActivities',
        message: 'Found Activities',
        activities
      }
    }
    const unknownError = {
      activities: {
        error: 'unknownError',
        name: 'unknownError',
        message: 'No activities found'
      }
    }

    if (activities?.error) return error
    //object {activities: {error: { name, error, message}}}
    if (!activities.length) return unknownError
    //object {activities: {message}}
    return success
    //object {activities: {message, activities: []}}
  } catch (error) {
    console.error(error)
    return {
      activities: {
        error,
        message: error.detail,
        name: 'errorFetching'
      }
    }
  }
}

export const createActivity = async ({ name, description }) => {
  try {
    const body = JSON.stringify({
      name,
      description
    })

    const req = {
      method: 'POST',
      body
    }

    const rawRes = await fetch(rCreateActivity, req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return {
        createdActivity: {
          name: 'serverError',
          error: 'serverError',
          message: rawRes.statusText
        }
      }

    const createdActivity = await rawRes.json()
    console.log('created activity', createdActivity)
    // Object: {
    //   id: int,
    //   name: string,
    //   description: string
    // }

    const error = {
      createdActivity: {
        name: createdActivity?.name || null,
        error: createdActivity?.error || null,
        message: createdActivity?.message || null
      }
    }
    const success = {
      createdActivity: {
        name: 'activityCreated',
        message: 'Activity Created',
        activity: createdActivity
      }
    }
    const unknownError = {
      createdActivity: {
        name: 'noActivity',
        error: 'noActivity',
        message: 'No activity created'
      }
    }

    if (createdActivity.error) return error
    if (!createdActivity.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      createdActivity: {
        name: 'errorFetching',
        error,
        message: error.detail
      }
    }
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
      updatedActivity: {
        name: updatedActivity?.name || null,
        error: updatedActivity?.error || null,
        message: updatedActivity?.message || null
      }
    }
    const success = {
      updatedActivity: {
        name: 'updatedActivity',
        message: 'Activity Updated',
        activity: updatedActivity
      }
    }
    const unknownError = { message: 'Failed to update activity' }

    if (updatedActivity.error) return error
    if (!updatedActivity.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      updatedActivity: {
        name: 'errorFetching',
        error,
        message: error.detail
      }
    }
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
    //     duration: int,
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
    const success = {
      routines: {
        name: 'foundRoutines',
        message: 'Routines found',
        routines
      }
    }
    const unknownError = {
      routines: {
        name: 'noRoutinesFound',
        message: 'No routines found',
        error: 'noRoutines'
      }
    }

    if (routines?.error) return error
    if (!routines.length) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      routines: {
        name: 'errorFetching',
        error,
        message: error.detail
      }
    }
  }
}
