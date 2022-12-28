import { routines } from './routes'
import { fetchWithAbort } from './index.js'
import { server } from 'remix.config'

const {
  rGetRoutines,
  rCreateRoutine,
  rUpdateRoutine, // fn (routineId)
  rDeleteRoutine, // fn (routineId)
  rAttachActToRoutine //fn (routineId)
} = routines

// console.error(error)
// return { error, message: error.detail }

export const getRoutines = async () => {
  try {
    const rawRes = await fetchWithAbort(rGetRoutines, 5000)
    //server error check
    // console.log(response)

    if (rawRes.error) {
      return { routines: rawRes }
    }

    const routines = await rawRes.json()
    console.log('routines: ', routines)
    // Array{
    //   id: int,
    //   creatorId: int,
    //   isPublic: bool,
    //   name: string,
    //   goal: string,
    //   creatorName: string,
    //   activities: Array {
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
        error: routines?.error || null,
        name: routines?.name || null,
        message: routines?.message || null
      }
    }
    const success = {
      routines: {
        name: 'foundRoutines',
        message: 'Found routines',
        routines
      }
    }
    const unknownError = {
      routines: {
        error: 'noRoutines',
        name: 'noRoutines',
        message: 'No routines found'
      }
    }

    if (routines.error) return error
    if (!routines.length) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      routines: {
        error,
        name: 'errorFetching',
        message: error.detail
      }
    }
  }
}

export const createRoutine = async ({ name, goal, isPublic = true }) => {
  try {
    const body = JSON.stringify({ name, goal, isPublic })
    const headers = { 'Content-Type': 'application/json' }
    const req = { method: 'POST', headers, body }

    const rawRes = await fetch(rCreateRoutine, req)

    if (rawRes.status >= 500 && rawRes.status <= 599) {
      const serverError = {
        createdRoutine: {
          name: 'serverError',
          error: 'serverError',
          message: rawRes.statusText
        }
      }
      return serverError
    }
    const createdRoutine = await rawRes.json()
    console.log('created routines', createdRoutine)
    // createdRoutine: Object{
    //   id: int,
    //   creatorId: int,
    //   isPublic: bool,
    //   name: string,
    //   goal: string
    // }

    const error = {
      createdRoutine: {
        error: createdRoutine?.error || null,
        name: createdRoutine?.name || null,
        message: createdRoutine?.message || null
      }
    }
    const success = {
      createdRoutine: {
        message: `Created routine ${createdRoutine.name} successfully`,
        createdRoutine
      }
    }
    const unknownError = {
      createdRoutine: {
        name: 'unknownError',
        error: 'unknownError',
        message: 'Could not create routine'
      }
    }

    if (createdRoutine.error) return error
    if (!createdRoutine.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      createdRoutine: {
        name: 'errorFetching',
        error,
        message: error.detail
      }
    }
  }
}

export const updateRoutine = async ({ name = null, goal = null, routineId, isPublic = null }) => {
  try {
    const body = JSON.stringify({ name, goal, isPublic })
    const headers = { 'Content-Type': 'application/json' }
    const req = { method: 'PATCH', headers, body }

    const rawRes = await fetch(rUpdateRoutine(routineId), req)

    if (rawRes.status >= 500 && rawRes.status <= 599) {
      const serverError = {
        updatedRoutine: {
          name: 'serverError',
          error: 'serverError',
          message: rawRes.statusText
        }
      }
      return serverError
    }

    const updatedRoutine = await rawRes.json()
    console.log('updated routine: ', updatedRoutine)

    //Object{
    //   id: Int,
    //   creatorId: int,
    //   isPublic: Boolean,
    //   name: String,
    //   goal: String
    // }
    const error = {
      updatedRoutine: {
        error: updatedRoutine?.error || null,
        name: updatedRoutine?.name || null,
        message: updatedRoutine?.message || null
      }
    }
    const success = {
      updatedRoutine: {
        message: 'Successfully updated routine',
        updatedRoutine
      }
    }
    const unknownError = {
      updatedRoutine: {
        error: 'unknownError',
        message: 'Could not update routine'
      }
    }

    if (updatedRoutine.error) return error
    if (!updatedRoutine.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      updatedRoutine: {
        name: 'error in request',
        error,
        message: error.detail
      }
    }
  }
}

//delete
export const deleteRoutine = async ({ token, routineId }) => {
  if (!token) return { success: false, name: 'noMatchingToken', message: 'No token given' }

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const req = { method: 'DELETE', headers }

    const rawRes = await fetch(rDeleteRoutine(routineId), req)

    if (rawRes.status >= 500 && rawRes.status <= 599) {
      const serverError = {
        deletedRoutine: {
          error: 'serverError',
          message: rawRes.statusText,
          name: 'serverError'
        }
      }
      return serverError
    }

    const deletedRoutine = await rawRes.json()
    console.log('deleted routine: ', deletedRoutine)

    // Object{
    //   success: bool,
    //   id: int,
    //   creatorId: int,
    //   isPublic: bool,
    //   name: string,
    //   goal: string
    // }
    const error = {
      deletedRoutine: {
        error: deletedRoutine?.error || null,
        name: deletedRoutine?.name || null,
        message: deletedRoutine?.message || null
      }
    }
    const success = {
      deletedRoutine: {
        message: 'Successfully deleted routine',
        deletedRoutine
      }
    }
    const unknownError = {
      deletedRoutine: {
        message: 'Could not delete routine',
        error: 'unknownError'
      }
    }

    if (deletedRoutine.error) return error
    if (!deletedRoutine.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      deletedRoutine: {
        error,
        message: error.detail
      }
    }
  }
}

// attach act to routine
export const attachActToRoutine = async ({ activityId, count, duration, routineId }) => {
  try {
    const body = JSON.stringify({ activityId, count, duration })
    const headers = { 'Content-Type': 'application/json' }
    const req = { method: 'POST', headers, body }

    const rawRes = await fetch(rAttachActToRoutine(routineId), req)

    if (rawRes.status >= 500 && rawRes.status <= 599) {
      const serverError = {
        attachedAct: {
          error: 'serverError',
          message: rawRes.statusText,
          name: 'serverError'
        }
      }
      return serverError
    }

    const attachedAct = await rawRes.json()
    console.log('attached act to routine: ', attachedAct)
    // Object {
    //   id: int,
    //   routineId: int,
    //   activityId: int,
    //   duration: int,
    //   count: int
    // }
    const error = {
      attachedAct: {
        error: attachedAct.error,
        name: attachedAct.name,
        message: attachedAct.message
      }
    }
    const success = {
      attachedAct: {
        message: 'Attached activity to routine',
        attachedAct
      }
    }
    const unknownError = {
      attachedAct: {
        error: 'unknownError',
        message: 'Could not attach activity to routine'
      }
    }

    if (attachedAct.error) return error
    if (!attachedAct.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      attachedAct: {
        error,
        message: error.detail
      }
    }
  }
}
