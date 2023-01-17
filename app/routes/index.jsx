import { useOutletContext, Form } from '@remix-run/react'

// loader and action
// export const loader = ({ request }) => {
//   console.log(123)
//   return json({})
// }

// export const action = async ({ request }) => {
//   return redirect(`/`)
// }

// component
export default function Index() {
  const {
    userState: [user, setUser]
  } = useOutletContext()

  return (
    <main>
      <h1>Welcome to FitnessTrackr!</h1>
      <p>
        If you haven't registered, please register to start creating fitness routines and
        activities, and even adding activities to routines!
      </p>
      <p>If you've already registered, please log in.</p>
      <p>Enjoy using this fun little tool to track and update your fitness schedule!</p>
    </main>
  )
}
