import { useNavigate, useOutletContext } from '@remix-run/react'
import { useEffect } from 'react'

const Index = () => {
  const navigate = useNavigate()
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken],
    registerState: [isRegister, setIsRegister]
  } = useOutletContext()

  useEffect(() => {
    if (!isLoggedIn) setTimeout(() => navigate('/users/login?register=false'), 1500)
    setIsRegister(false)
  }, [])

  return isLoggedIn ? (
    <section>
      <h1>profile</h1>
      <p>Here's your profile</p>
    </section>
  ) : (
    <section>
      <p>Not logged in... Redirecting.</p>
    </section>
  )
}

export default Index
