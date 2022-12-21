import { users } from './routes'
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
    const user = await rawRes.json()
    console.log(user)
    // Object {
    //   id: int,
    //   username: string
    // }

    const error = {
      name: user?.name || null,
      error: user?.error || null,
      message: user?.message || null
    }
    const success = { message: "Here's the user", user }
    const unknownError = { message: 'Could not get user' }

    if (user?.error) return error
    if (user && Object.keys(user).length) return success
    return unknownError
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
    const userPubRoutines = await rawRes.json()
    console.log('users public routines: ', userPubRoutines)
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
      name: userPubRoutines?.name || null,
      error: userPubRoutines?.error || null,
      message: userPubRoutines?.message || null
    }
    const success = { message: 'Found Public Routines by User', userPubRoutines }
    const unknownError = { message: `cannot find public routines by user ${username}` }

    if (userPubRoutines?.error) return error
    if (userPubRoutines && userPubRoutines.length) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}

export const regOrLoginUser = async ({ username, password, action }) => {
  let url = action == 'reg' ? rRegister : rLogin

  try {
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ username, password })

    const req = { method, headers, body }

    const rawRes = await fetch(url, req)
    const loggedInUser = await rawRes.json()
    console.log('this is user response', loggedInUser)
    // Object  {
    //   user: Object {
    //     id: int,
    //     username: string,
    //   }
    //   message: string
    //   token: string
    // }
    const error = {
      name: loggedInUser?.name || null,
      error: loggedInUser?.error || null,
      message: loggedInUser?.message || null
    }
    const success = loggedInUser
    const unknownError = {
      message: 'cannot find or create user with that combination of username and password'
    }

    if (loggedInUser?.error) return error
    if (loggedInUser && loggedInUser?.token) return success
    return unknownError
  } catch (error) {
    console.error(error)
    return { error, message: error.detail }
  }
}
