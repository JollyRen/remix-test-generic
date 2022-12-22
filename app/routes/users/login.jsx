import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useOutletContext, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { regOrLoginUser } from '../../utils/index'

// export const loader = async ({ req }) => {
//   return json()
// }

export const action = async ({ request }) => {
  const formData = await request.formData()
  const { _action, username, password } = Object.fromEntries(formData)
  const { user, message, token, error, name } = await regOrLoginUser(username, password, _action)
  if (error) return { name, error, message }
  if (token.length) return { user, token, message }
  return { error: 'noTokenNoUser', message: 'No token made or user found!' }
}

function Login() {
  const navigate = useNavigate()
  const actionData = useActionData()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken]
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

  const handleIsRegister = () => setIsRegister(!isRegister)

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

  return (
    <div>
      {isRegister ? 'Register' : 'Log In'}
      <Form method="post">
        <input type="text" name="username" placeholder="superMuffinMan" required></input>
        <input type="password" name="password" placeholder="8 characters pls" required></input>
        <button type="submit" name="_action" value={isRegister ? 'reg' : ''}>
          {isRegister ? 'Register' : 'Log In'}
        </button>
        {error && <p style={{ color: 'red' }}>{message}</p>}
      </Form>
      {(error || message) && (
        <p>
          <span style={{ color: 'red' }}>{message}</span>
        </p>
      )}
      {registerToggle}
    </div>
  )
}

export default Login
