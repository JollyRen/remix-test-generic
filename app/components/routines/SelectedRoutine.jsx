import { useFetcher } from '@remix-run/react'
import SingleRoutineActivity from './SingleRoutine'

const SelectedRoutine = ({ routine }) => {
  // const fetcher = useFetcher()
  // const { id, creatorId, isPublic, name, goal, creatorName, activities } = routine
  // return (
  //   <section style={{ padding: '20px', backgroundColor: 'rgb(0,0,0,0.1)' }}>
  //     <h3>{name} </h3>
  //     <p></p>
  //     <p></p>
  //     <p>Creator's Name: {creatorName}</p>
  //     <p>Goal: {goal}</p>
  //     <p>Activities: </p>
  //     <ul>
  //       {!activities.length ? (
  //         <p>No Activities listed for this routine yet</p>
  //       ) : (
  //         activities.map((routineActivity) => (
  //           <SingleRoutineActivity key={routineActivity.id} routineActivity={routineActivity} />
  //         ))
  //       )}
  //     </ul>
  //   </section>
  // )
}
export default SelectedRoutine
