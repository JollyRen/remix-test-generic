import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import Navbar from './components/navbar.jsx'
import { useState } from 'react'
import globalStyles from '~/styles/global.css'

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
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const contextObject = {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn]
  }
  return (
    <Doc>
      <Layout user={user} isLoggedIn={isLoggedIn}>
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

export const Layout = ({ children, user, isLoggedIn }) => {
  return (
    <div className="layout-container">
      <Navbar user={user} isLoggedIn={isLoggedIn} />
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
