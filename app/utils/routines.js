import { routines } from './routes'

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
    const method = 'GET'
    const headers = { 'Content-Type': 'application/json' }
    const req = { method, headers }

    const rawRes = await fetch(rGetRoutines, req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
      error: routines?.error || null,
      name: routines?.name || null,
      message: routines?.message || null
    }
    const success = {
      message: 'Found routines',
      routines
    }
    const unknownError = { message: 'No routines found' }

    if (routines?.error) return error
    if (routines?.length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const createRoutine = async ({ name, goal, isPublic = null }) => {
  try {
    const body = JSON.stringify({ name, goal, isPublic })
    const headers = { 'Content-Type': 'application/json' }
    const req = { method: 'POST', headers, body }

    const rawRes = await fetch(rCreateRoutine, req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
      error: createdRoutine?.error || null,
      name: createdRoutine?.name || null,
      message: createdRoutine?.message || null
    }
    const success = {
      message: `Created routine ${createdRoutine.name} successfully`,
      createdRoutine
    }
    const unknownError = { message: 'Could not create routine' }

    if (createdRoutine?.error) return error
    if (createdRoutine && Object.keys(createdRoutine).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
    }
  }
}

export const updateRoutine = async ({ name = null, goal = null, routineId, isPublic = null }) => {
  try {
    const body = JSON.stringify({ name, goal, isPublic })
    const headers = { 'Content-Type': 'application/json' }
    const req = { method: 'PATCH', headers, body }

    const rawRes = await fetch(rUpdateRoutine(routineId), req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
      error: updatedRoutine?.error || null,
      name: updatedRoutine?.name || null,
      message: updatedRoutine?.message || null
    }
    const success = {
      message: 'Successfully updated routine',
      updatedRoutine
    }
    const unknownError = { message: 'Could not update routine' }

    if (updatedRoutine?.error) return error
    if (updatedRoutine && Object.keys(updatedRoutine).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
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

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
    const noSuccess = {
      error: deletedRoutine?.error || null,
      name: deletedRoutine?.name || null,
      message: deletedRoutine?.message || null
    }
    const success = {
      message: 'Successfully deleted routine',
      deletedRoutine
    }
    const unknownError = { message: 'Could not delete routine' }

    if (!deletedRoutine?.success) return noSuccess
    if (deletedRoutine?.success) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
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

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

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
      error: attachedAct.error,
      name: attachedAct.name,
      message: attachedAct.message
    }
    const success = {
      message: 'Attached activity to routine',
      attachedAct
    }
    const unknownError = {
      message: 'Could not attach activity to routine'
    }

    if (attachedAct?.error) return error
    if (attachedAct && Object.keys(attachedAct).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
    }
  }
}
