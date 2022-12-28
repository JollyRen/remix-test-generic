import { useFetcher } from '@remix-run/react'
import { useState } from 'react'

const SingleRA = ({ activity }) => {
  const [isUpdate, setIsUpdate] = useState(false)
  const fetcher = useFetcher()
  const { id, name, description, duration, count, routineActivityId: raId, routineId } = activity

  const handleRemoveActivity = () => {
    fetcher.submit({}, { method: 'delete', action: `/__routine_activities/${raId}` })
  }

  const handleIsUpdate = () => setIsUpdate(!isUpdate)

  return (
    <li key={id} style={{ listStyleType: 'none' }}>
      <h4>
        {name}
        <span onClick={handleRemoveActivity} aria-label="remove">
          ✕
        </span>
      </h4>
      <p>Description: {description}</p>
      <p>Count: {count}</p>
      <p>Duration: {duration}</p>
      {!isUpdate ? (
        <button type="button" onClick={handleIsUpdate}>
          Update Activity
        </button>
      ) : (
        <div>
          <button type="button" onClick={handleIsUpdate}>
            Cancel Updating
          </button>
          {/* placeholder for update form comp */}
        </div>
      )}
    </li>
  )
}

export default SingleRA
