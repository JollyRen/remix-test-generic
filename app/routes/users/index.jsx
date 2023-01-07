import { useNavigate, useOutletContext } from '@remix-run/react'
import { useEffect } from 'react'

const Index = () => {
  const navigate = useNavigate()
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken]
  } = useOutletContext()

  useEffect(() => {
    if (!isLoggedIn) navigate('/users/login?register=false')
  }, [])

  return (
    <section>
      <h1>profile</h1>
      <p>Here's your profile</p>
    </section>
  )
}

export default Index
