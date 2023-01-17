import { json } from '@remix-run/node'
import { useCatch } from '@remix-run/react'
import { deleteRoutine, attachActToRoutine, updateRoutine } from '~/utils/routines'

export function CatchBoundary() {
  const caught = useCatch()
  const { error, name, message } = caught.data
  console.log(caught)
  const liStyle = { listStyleType: 'none' }
  const divStyle = { display: 'flex', flexFlow: 'column', alignItems: 'center' }

  return (
    <div style={divStyle}>
      <h1>Error</h1>
      <h2>Status: {caught.status}</h2>
      <p>{name}</p>
      <ul>
        <li style={liStyle}>{error}</li>
        <li style={liStyle}>{message}</li>
      </ul>
    </div>
  )
}

// export const loader = async ({ request }) => {
// }

export const action = async ({ request }) => {
  try {
    // getting form data
    const formData = await request.formData()
    const { _action, ...data } = Object.fromEntries(formData)
    console.log(_action, data)

    //if no action
    if (!_action) {
      throw json({ message: 'No Action in request', error: 'noAction' })
    }

    //actions
    if (_action == 'updateRoutine') {
      const { name, goal, routineId, isPublic } = data
      const { updatedRoutine } = await updateRoutine({ name, goal, routineId, isPublic })
      if (updatedRoutine.error) throw json(updatedRoutine)
      return json(updatedRoutine)
    }
    if (_action == 'deleteRoutine') {
      const { routineId, token } = data // protected route, need token
      const { deletedRoutine } = await deleteRoutine({ token, routineId })
      if (deletedRoutine.error) throw json(deletedRoutine)
      return json(deletedRoutine)
    }
    if (_action == 'attachActToRoutine') {
      const { routineId, activityId, count, duration } = data
      const { attachedAct } = await attachActToRoutine({ routineId, activityId, count, duration })
      if (attachedAct.error) throw json(attachedAct)
      return json(attachedAct)
    }

    // something unexpected
    throw json({ message: 'unknownError occured in action', error: 'unknownError' })
  } catch (error) {
    // error in fetch
    console.error(error)
    throw json({ error, message: 'error fetching request' })
  }
}
