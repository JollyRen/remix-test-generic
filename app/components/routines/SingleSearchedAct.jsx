import { useState } from 'react'
// import { useFetcher } from '@remix-run/react'
import { Form } from '@remix-run/react'

const SingleSearchedAct = ({ activity, routineId }) => {
  const [isAdd, setIsAdd] = useState(false)
  // const fetcher = useFetcher()

  const handleIsAdd = () => setIsAdd(!isAdd)

  // const handleAddToRoutine = ({ activityId, count, duration }) => {
  //   fetcher.submit({ _action: 'attachActToRoutine' }, { method: 'post', action: '/routines' })
  // }
  // ;() => handleAddToRoutine({ activityId: activity.id })

  return (
    <div key={activity.id}>
      <p>
        <strong>{activity.name}</strong>{' '}
        {!isAdd ? (
          <span
            style={{ cursor: 'pointer' }}
            aria-label="Add to Selected Routine"
            onClick={handleIsAdd}>
            ✔️
          </span>
        ) : (
          <span
            style={{ cursor: 'pointer' }}
            aria-label="Cancel adding to routine"
            onClick={handleIsAdd}>
            ✖️
          </span>
        )}
      </p>
      <p>{activity.description}</p>
      {isAdd ? (
        <Form method="post" action="/routines">
          <label htmlFor="count">
            Count
            <input title="count" name="count" type="number" />
          </label>
          <label htmlFor="duration">
            Duration
            <input title="duration" name="duration" type="number" />
          </label>
          <input readOnly hidden name="_action" value="attachActToRoutine" />
          <input readOnly hidden name="activityId" value={activity.id} />
          <input readOnly hidden name="routineId" value={routineId} />
          <button type="submit" aria-label="Add to Selected Routine">
            ✔️
          </button>
          <button type="button" aria-label="Cancel adding to Routine" onClick={handleIsAdd}>
            ✖️
          </button>
        </Form>
      ) : null}
    </div>
  )
}

export default SingleSearchedAct
