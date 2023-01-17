import { json } from '@remix-run/node'
import { updateRA, deleteRA } from '~/utils'

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const { _action, ...data } = Object.fromEntries(formData)
  //if no actions
  if (!_action)
    throw json({
      name: 'noAction',
      error: 'noAction',
      message: 'no action in submission'
    })

  // actions
  if (_action == 'deleteRA') {
    const { raId, token } = data
    const deletedRA = await deleteRA({ token, raId })
    console.log('deletedRA', deletedRA)

    if (deletedRA.error) throw json(deletedRA)

    return json(deletedRA)
  }

  if (_action == 'updateRA') {
    const { count, duration, raId } = data
    const updatedRA = await updateRA({ count, duration, raId })
    console.log('updatedRA', updatedRA)

    if (updatedRA.error) throw json(updatedRA)

    return json(updatedRA)
  }

  throw json({
    name: 'actionUnknown',
    message: 'unknown action used',
    error: 'unknownAction'
  })
}
