import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'

const SingleRA = ({ activity }) => {
  const [isUpdate, setIsUpdate] = useState(false)
  const fetcher = useFetcher()
  const { id, name, description, duration, count, routineActivityId: raId, routineId } = activity
  // console.log(raId, routineId, id)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleRemoveActivity = () => {
    const token = localStorage.getItem('token')
    fetcher.submit({ token, _action: 'deleteRA', raId }, { method: 'post', action: `/ra` })
  }

  const handleIsUpdate = () => setIsUpdate(!isUpdate)

  useEffect(() => {
    console.log(fetcher?.data)
    if (fetcher?.data?.deletedRA) {
      const { deletedRA } = fetcher.data
      if (deletedRA.error) {
        console.error(deletedRA.error)
        setError(deletedRA.name)
        setMessage(deletedRA.message)
      }
    }
  }, [fetcher])

  return (
    <li style={{ listStyleType: 'none' }}>
      <h4>
        {name}
        <span
          style={{ cursor: 'pointer' }}
          onClick={handleRemoveActivity}
          aria-label="Remove activity from routine">
          ✕
        </span>
      </h4>
      {error ? (
        <div>
          <p>{error}</p>
          <p>{message}</p>
        </div>
      ) : null}
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
