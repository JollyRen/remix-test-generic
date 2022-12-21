const url = 'http://fitnesstrac-kr.herokuapp.com/api/'

const routes = {
  users: {
    rGetUser: `${url}users/me`,
    rGetUserPubRoutines: (username) => `${url}users/${username}/routines`,
    rRegister: `${url}users/register`,
    rLogin: `${url}users/login`
  },
  activities: {
    rGetActivities: `${url}activities`,
    rGetRoutinesByActivity: (activityId) => `${url}activities/${activityId}/routines`,
    rCreateActivity: `${url}activities`,
    rUpdateActivity: (activityId) => `${url}activities/${activityId}`
  },
  routines: {
    rGetRoutines: `${url}routines`,
    rCreateRoutine: `${url}routines`,
    rUpdateRoutine: (routineId) => `${url}routines/${routineId}`,
    rDeleteRoutine: (routineId) => `${url}routines/${routineId}`,
    rAttachActToRoutine: (routineId) => `${url}routines/${routineId}/activities`
  },
  rA: {
    rUpdateRA: (raId) => `${url}routine_activities/${raId}`,
    rDeleteRA: (raId) => `${url}routine_activities/${raId}`
  }
}

export default routes
