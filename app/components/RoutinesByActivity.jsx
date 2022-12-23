const RoutinesByActivity = ({ routines }) => {
  const filterCB = (r) => r.isPublic
  const mappingCB = (routine, idx) => (
    <section style={{ padding: '20px', backgroundColor: 'rgb(0,0,0,0.1)' }} key={routine.id}>
      <h2>{routine.name}</h2>
      <p>Creator Name: {routine.creatorName}</p>
      <p>Goal: {routine.goal}</p>
    </section>
  )

  const routinesMap = routines.length ? routines.filter(filterCB).map(mappingCB) : null

  const errorJSX = (
    <div>
      <p>{routines.error}</p>
      <p>{routines.message}</p>
    </div>
  )

  return <article>{routines.error ? errorJSX : routinesMap}</article>
}

export default RoutinesByActivity
