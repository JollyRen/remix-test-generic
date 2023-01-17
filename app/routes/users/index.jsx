import { useNavigate, useOutletContext } from '@remix-run/react'
import { useEffect } from 'react'
import { getUserPubRoutines } from '~/utils'

export const errorBoundary = ({ error }) => {
  console.error(error)
  return (
    <div>
      <p>error: {error}</p>
    </div>
  )
}

const Index = () => {
  const navigate = useNavigate()
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken],
    registerState: [isRegister, setIsRegister],
    userRoutinesState: [userRoutines, setUserRoutines]
  } = useOutletContext()

  useEffect(() => {
    if (!isLoggedIn) setTimeout(() => navigate('/users/login?register=false'), 1500)
    setIsRegister(false)
  }, [])

  return isLoggedIn ? (
    <section>
      <h1>profile</h1>
      <p>Here's your profile</p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <h2>User's Routines: </h2>
      {!userRoutines.length ? (
        <p>No Routines yet, make some</p>
      ) : (
        userRoutines.map((routine) => {
          return <section key={routine.id}></section>
        })
      )}
    </section>
  ) : (
    <section>
      <p>Not logged in... Redirecting.</p>
    </section>
  )
}

export default Index
