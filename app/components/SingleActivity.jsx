import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useOutletContext } from '@remix-run/react'
import { updateActivity, getRoutinesByActivity, getActivities } from '~/utils'
import { useEffect, useState } from 'react'

export const loader = async ({ request }) => {
  const response = await getActivities()
  console.log(response)
  return json(response)
}

export const action = async ({ request }) => {
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

  if (_action == 'getRoutinesByActivity') {
    const body = { activityId: values.activityId }
    const routines = await getRoutinesByActivity(body)
    return json(routines)
  }

  return null
}

const SingleActivity = ({ activity, routinesState }) => {
  const [currentActivity, setCurrentActivity] = useState(activity)

  const {
    activityState: [publicActivities, setPublicActivities]
  } = useOutletContext()

  const [routinesByActivity, setRoutinesByActivity] = routinesState

  const { id, name, description } = activity
  // const {
  //   activity: {
  //     message: activityMessage,
  //     activity: { upId, upName, upDesc }
  //   },
  //   routines: { message: routinesMessage, routines }
  // } = useActionData()
  const actionData = useActionData()
  const loaderData = useLoaderData()

  const [isEdit, setIsEdit] = useState(false)

  const handleToggleEdit = (e) => {
    e.preventDefault()
    setIsEdit(!isEdit)
  }

  useEffect(() => {
    if (actionData?.activity) {
      const { message, activity } = actionData
      console.log(message)
      setCurrentActivity(activity)
    }

    if (actionData?.routines) {
      const { message, routines } = actionData
      console.log(message)
      setRoutinesByActivity(routines)
    }
    if (loaderData?.activities) {
      const { message, activities } = loaderData
      console.log(message)
      setPublicActivities(activities)
    }
  }, [actionData, loaderData])

  return (
    <section>
      <h3>{name}</h3>
      <p>
        <span style={{ fontWeight: 'bold' }}>Description:</span> {description}
      </p>
      <button type="button" onClick={handleToggleEdit}>
        {!isEdit ? 'Edit' : 'Cancel Edit'}
      </button>
      {!isEdit ? (
        <Form method="get">
          <p>Find Routines by Activity?</p>
          <input type="hidden" name="activityId" value={id} />
          <button
            style={{
              color: 'green',
              fontWeight: 'bold',
              borderRadius: '25px',
              backgroundColor: 'none',
              border: '1px solid rgb(255, 255, 255, 0)'
            }}
            type="submit"
            name="_action"
            value="getRoutinesByActivity"
            aria-label="find">
            ✓
          </button>
        </Form>
      ) : (
        <Form method="post">
          <input type="hidden" name="activityId" value={id} title="id" />
          <label htmlFor="name">
            <p style={{ fontWeight: 'bold' }}>{name}</p>
            <input type="text" name="name" value={name} title="name" />
          </label>
          <label htmlFor="description">
            <p style={{ fontWeight: 'bold' }}>{description}</p>
            <input type="text" name="description" value={description} title="description" />
          </label>
          <button type="submit" name="_action" value="updateActivity">
            Update Activity
          </button>
        </Form>
      )}
    </section>
  )
}
export default SingleActivity
