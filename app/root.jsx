import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSearchParams
} from '@remix-run/react'
import Navbar from './components/navbar.jsx'
import { useEffect, useState } from 'react'
import globalStyles from '~/styles/global.css'
import { getUser } from './utils/users.js'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links = () => [
  {
    rel: 'stylesheet',
    href: globalStyles
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,800;1,300;1,400;1,600;1,800&display=swap'
  }
]

export default function App() {
  const [params, setParams] = useSearchParams()
  const [isRegister, setIsRegister] = useState(params.get('register') ?? false)
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
      setIsLoggedIn(true)
      const userFromToken = async () => {
        const { user: fetchedUser } = await getUser({ token: localToken })
        // console.log(fetchedUser.message)
        setUser(fetchedUser.user)
      }
      userFromToken()
    }
  }, [])

  const contextObject = {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken],
    registerState: [isRegister, setIsRegister]
  }

  return (
    <Doc>
      <Layout localState={contextObject}>
        <Outlet context={contextObject} />
      </Layout>
    </Doc>
  )
}

export const Doc = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export const Layout = ({ children, localState }) => {
  return (
    <div className="layout-container">
      <Navbar localState={localState} />
      {children}
      <Footer />
    </div>
  )
}

export const Footer = () => {
  return (
    <div className="footer-container">
      <p>I'm the footer</p>
    </div>
  )
}
