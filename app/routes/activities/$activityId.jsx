import { json } from '@remix-run/node'
import { Form, Link, useFetcher, useParams } from '@remix-run/react'
import { updateActivity, getRoutinesByActivity } from '~/utils'
import { useEffect, useState } from 'react'

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const {
    _action,
    values: { ...values }
  } = Object.fromEntries(formData)
  console.log(_action, values)

  if (_action == 'updateActivity') {
    const body = {
      name: values?.name,
      description: values?.description,
      activityId: values.activityId
    }
    const activity = await updateActivity(body)
    return json(activity)
  }

  return null
}
export const loader = async ({ request, params }) => {
  const body = { ...params }
  const { routines } = await getRoutinesByActivity(body)

  console.log(routines)
  return json(routines)
}

const SingleActivity = ({ activity, setRoutines }) => {
  let { id, name, description } = activity
  const [isEdit, setIsEdit] = useState(false)
  const fetcher = useFetcher()
  let message = fetcher.data?.message ?? ''

  const handleToggleEdit = () => setIsEdit(!isEdit)

  const styleGetRoutines = {
    display: 'inline',
    marginLeft: '8px',
    marginTop: '8px',
    color: 'green',
    fontWeight: 'bold',
    borderRadius: '25px',
    background: 'none',
    backgroundColor: 'none',
    border: '1px solid rgba(0, 0, 0, 0.10)',
    textDecoration: 'none',
    cursor: 'pointer',
    paddingBottom: '4px',
    paddingTop: '2px',
    paddingLeft: '9px',
    paddingRight: '9px'
  }

  const handleFindRoutines = () => {
    fetcher.load(`/activities/${id}`)
  }

  useEffect(() => {
    console.log('fetcher data changed')
    if (fetcher.data) {
      console.log(fetcher.data)
      fetcher.data.routines && setRoutines(fetcher.data.routines)
    }
  }, [fetcher.data])

  // const actionData = useActionData()

  return (
    <section>
      <h3>{name}</h3>
      {!isEdit && (
        <div style={{ display: 'inline' }}>
          <span style={{ fontWeight: 'bold' }}>Description: </span>
          <span>{description}</span>
        </div>
      )}
      <button
        style={{ marginLeft: '4px', marginBottom: '8px' }}
        type="button"
        onClick={handleToggleEdit}>
        {!isEdit ? 'Edit' : 'Cancel Edit'}
      </button>
      {!isEdit ? (
        <div>
          <span>Find Routines by Activity?</span>
          <span
            className="get-routines"
            style={styleGetRoutines}
            aria-label="find"
            onClick={handleFindRoutines}>
            ✓
          </span>
        </div>
      ) : (
        <fetcher.Form method="post">
          <input type="hidden" name="activityId" defaultValue={id} title="id" />
          <label htmlFor="name">
            <p style={{ fontWeight: 'bold' }}>{name}</p>
            <input type="text" name="name" defaultValue={name} title="name" />
          </label>
          <label htmlFor="description">
            <p style={{ fontWeight: 'bold' }}>{description}</p>
            <input type="text" name="description" defaultValue={description} title="description" />
          </label>
          <button type="submit" name="_action" value="updateActivity">
            Update Activity
          </button>
        </fetcher.Form>
      )}
    </section>
  )
}
export default SingleActivity
