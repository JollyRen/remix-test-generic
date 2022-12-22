const RoutinesByActivity = ({ routinesState }) => {
  console.log("i'm in RBA")
  const [routinesByActivity, setRoutinesByActivity] = routinesState

  const filterCB = (r) => r.isPublic
  const mappingCB = (routine, idx) => (
    <section key={routine.id}>
      <h2>{routine.name}</h2>
      <p>Creator Name: {routine.creatorName}</p>
      <p>Goal: {routine.goal}</p>
    </section>
  )

  const routinesMap = routinesByActivity.length
    ? routinesByActivity.filter(filterCB).map(mappingCB)
    : null

  const errorJSX = (
    <div>
      <p>{routinesByActivity.error}</p>
      <p>{routinesByActivity.message}</p>
    </div>
  )
  console.log('error', routinesByActivity.message)
  console.log('Routines By Activity:', routinesByActivity)

  return <article>{routinesByActivity.error ? errorJSX : routinesMap}</article>
}

export default RoutinesByActivity
