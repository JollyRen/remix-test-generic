import { useFetcher } from '@remix-run/react'
import { useState, useEffect } from 'react'

const SingleActivity = ({ activity, setRoutines, setSingleActivity }) => {
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
    setSingleActivity(activity)
    fetcher.load(`/activities/${id}`)
  }

  useEffect(() => {
    if (fetcher.data) {
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
