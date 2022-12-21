import { rA } from './routes'

const { rUpdateRA, rDeleteRA } = rA //both fn (raId)

export const updateRA = async ({ count, duration, raId }) => {
  try {
    const body = JSON.stringify({ count, duration })
    const req = { method: 'PATCH', body }

    const rawRes = await fetch(rUpdateRA(raId), req)
    const updatedRA = await rawRes.json()
    console.log(updatedRA)

    //Object{
    //   id: int,
    //   routineId: int,
    //   activityId: int,
    //   duration: int,
    //   count: int
    // }
    const error = {
      error: updatedRA?.error || null,
      message: updatedRA?.message || null,
      name: updatedRA?.name || null
    }
    const success = {
      message: 'Updated count and duration',
      updatedRA
    }
    const unknownError = {
      message: 'Could not update count and duration'
    }

    if (updatedRA?.error) return error
    if (updatedRA && Object.keys(updatedRA).length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
    }
  }
}

export const deleteRA = async ({ token, raId }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const req = { method: 'DELETE', headers }

    const rawRes = await fetch(rDeleteRA(raId), req)
    const deletedRA = await rawRes.json()
    console.log(deletedRA)
    //Object{
    //   success: bool,
    //   id: int,
    //   routineId: int,
    //   activityId: int,
    //   duration: int,
    //   count: int
    // }
    const error = {
      error: deletedRA?.error || null,
      message: deletedRA?.message || null,
      name: deletedRA?.name || null
    }
    const success = {
      message: 'Activity removed from routine',
      deletedRA
    }
    const unknownError = {
      message: 'Activity cannot be removed from routine. Try again later'
    }

    if (deletedRA?.error) return error
    if (deletedRA && deletedRA.success == true) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return {
      error,
      message: error.detail
    }
  }
}
