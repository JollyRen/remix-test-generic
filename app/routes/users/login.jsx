import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useOutletContext, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { regOrLoginUser } from '../../utils/index'

export const loader = async ({ req }) => {
  return json()
}

export const action = async ({ rawReq }) => {
  const formData = await rawReq.formData()
  const req = Object.fromEntries(formData)
  console.log(req)
  const res = await regOrLoginUser(req.username, req.password, req._action)
  if (res.error || res.token) return res
  return { error: 'noTokenNoUser', message: 'No token made or user found!' }
}

function Login() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const { user: fetchedUser, token: fetchedToken, error, message } = useActionData()
  const {
    userState: [user, setUser],
    tokenState: [token, setToken]
  } = useOutletContext()

  if (user || token) {
    setIsRegister(false)
    navigate('/profile')
  }
  useEffect(() => {
    if (fetchedUser && fetchedToken) {
      setUser(fetchedUser)
      setToken(fetchedToken)
    }
  }, [fetchedUser, fetchedToken])

  const handleIsRegister = () => setIsRegister(true)

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
      {!isRegister && (
        <p>
          not registered?{' '}
          <span style={{ color: 'blue' }} onClick={handleIsRegister}>
            click here!
          </span>
        </p>
      )}
    </div>
  )
}

export default Login
