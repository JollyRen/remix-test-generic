import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useOutletContext, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { regOrLoginUser } from '../../utils/index.js'

// export const loader = async ({ req }) => {
//   return json()
// }

export const action = async ({ request }) => {
  const formData = await request.formData()
  console.log(formData)
  for (const [key, value] of formData.entries()) {
    console.log(key, value)
  }
  const { _action, username, password } = Object.fromEntries(formData)
  console.log(_action, username, password)
  try {
    if (!username)
      return json({ error: 'noUsername', message: 'No username given, please enter one' })
    if (password.length < 8)
      return json({
        error: 'passwordTooShort',
        message: 'Password is too short, it must be 8 characters or longer'
      })
    const { user, message, token, error, name } = await regOrLoginUser(username, password, _action)
    if (error) return json({ name, error, message })
    if (token.length) return json({ user, token, message })
  } catch (error) {
    return json({ error: 'noTokenNoUser', message: 'No token made or user found!' })
  }
}

function Login() {
  const navigate = useNavigate()
  const actionData = useActionData()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken],
    registerState: [isRegister, setIsRegister]
  } = useOutletContext()

  useEffect(() => {
    if (actionData?.fetchedUser && actionData?.fetchedToken) {
      const { user, token, message } = actionData
      setUser(user)
      setToken(token)
      setMessage(message)
      setIsLoggedIn(true)
      navigate('/')
    }
    if (actionData?.error) {
      const { error, message } = actionData
      setError(error)
      setMessage(message)
    }
  }, [actionData])

  useEffect(() => {
    isLoggedIn && navigate('/users')
  }, [isLoggedIn])

  const handleIsRegister = () => {
    setIsRegister(!isRegister)
    navigate(`/users/login?register=${!isRegister}`)
  }

  //abstracted parts of jsx

  const registerToggle = !isRegister ? (
    <p>
      Not registered?{' '}
      <span style={{ color: 'blue' }} onClick={handleIsRegister}>
        click here
      </span>
      !
    </p>
  ) : (
    <p>
      To log in{' '}
      <span style={{ color: 'blue' }} onClick={handleIsRegister}>
        click here
      </span>
      !
    </p>
  )

  const messages = (error || message) && (
    <p>
      <span style={{ color: 'red' }}>{message}</span>
    </p>
  )

  return (
    <div>
      {isRegister ? 'Register' : 'Log In'}
      <Form method="post" action="/users/login">
        <input type="text" name="username" placeholder="superMuffinMan"></input>
        <input type="password" name="password" placeholder="8 characters pls"></input>
        <button type="submit" name="_action" value={isRegister ? 'reg' : ''}>
          {isRegister ? 'Register' : 'Log In'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
      {messages}
      {registerToggle}
    </div>
  )
}

export default Login
