import { useNavigate, useOutletContext } from '@remix-run/react'

const Index = () => {
  const navigate = useNavigate()
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken]
  } = useOutletContext()

  if (!isLoggedIn) navigate('/users/login')

  return (
    <section>
      <h1>profile</h1>
      <p>Here's your profile</p>
    </section>
  )
}

export default Index
