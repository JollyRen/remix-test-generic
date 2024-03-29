import { users } from './routes'
import { fetchWithAbort } from './index.js'
const {
  rGetUser,
  rGetUserPubRoutines, // fn (username)
  rRegister,
  rLogin
} = users

export const getUser = async ({ token }) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    const req = { headers }

    const rawRes = await fetch(rGetUser, req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

    const user = await rawRes.json()
    // console.log(user)
    // Object {
    //   id: int,
    //   username: string
    // }

    const error = {
      user: {
        name: user?.name || null,
        error: user?.error || null,
        message: user?.message || null
      }
    }
    const success = {
      user: {
        name: 'foundUser',
        message: 'Got your user!',
        user: user
      }
    }
    const unknownError = {
      user: {
        name: 'unknownError',
        error: 'unknownError',
        message: 'cannot find or create user with that combination of username and password'
      }
    }

    if (user.error) return error
    if (!user.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const getUserPubRoutines = async ({ username }) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    const req = { headers }

    const rawRes = await fetch(rGetUserPubRoutines(username), req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { error: 'serverError', message: rawRes.statusText }

    const userPubRoutines = await rawRes.json()
    // console.log('users public routines: ', userPubRoutines)
    // Array{
    //   id: int,
    //   creatorId: int,
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
      userRoutines: {
        name: userPubRoutines?.name || null,
        error: userPubRoutines?.error || null,
        message: userPubRoutines?.message || null
      }
    }
    const success = {
      userRoutines: {
        name: 'successUserRoutines!',
        message: 'Found Public Routines by User',
        userPubRoutines
      }
    }
    const unknownError = {
      userRoutines: {
        name: 'unknownError',
        error: 'unknownError',
        message: `cannot find public routines by user ${username}`
      }
    }

    if (userPubRoutines?.error) return error
    if (!userPubRoutines) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return {
      userRoutines: {
        name: 'errorFetching',
        error,
        message: error.detail
      }
    }
  }
}

export const regOrLoginUser = async ({ username, password, _action }) => {
  let url = _action == 'reg' ? rRegister : rLogin

  try {
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ username, password })

    const req = { method, headers, body }

    const rawRes = await fetch(url, req)

    if (rawRes.status >= 500 && rawRes.status <= 599)
      return { user: { error: 'serverError', message: rawRes.statusText } }

    const loggedInUser = await rawRes.json()
    // console.log('this is user response', loggedInUser)
    // Object  {
    //   user: Object {
    //     id: int,
    //     username: string,
    //   }
    //   message: string
    //   token: string
    // }
    const error = {
      user: {
        name: loggedInUser?.name || null,
        error: loggedInUser?.error || null,
        message: loggedInUser?.message || null
      }
    }
    const success = {
      user: {
        name: 'foundUser',
        message: loggedInUser.message,
        user: loggedInUser.user,
        token: loggedInUser.token
      }
    }
    const unknownError = {
      user: {
        error: 'unknownError',
        message: 'cannot find or create user with that combination of username and password'
      }
    }

    if (loggedInUser.error) return error
    if (!loggedInUser.user.id) return unknownError
    return success
  } catch (error) {
    console.error(error)
    return { user: { error, message: error.detail } }
  }
}
