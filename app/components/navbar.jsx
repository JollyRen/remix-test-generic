import { NavLink, useLocation, useSearchParams } from '@remix-run/react'
import { useEffect, useState, useCallback, useRef } from 'react'
import { navlinks } from '../utils/index'

const Navbar = ({ localState }) => {
  const {
    isLoggedInState: [isLoggedIn],
    registerState: [isRegister, setIsRegister]
  } = localState

  let location = useLocation()
  let [params, setParams] = useSearchParams()

  const [showLogin, setShowLogin] = useState(!isLoggedIn && !isRegister)
  const [showRegister, setShowRegister] = useState(!isLoggedIn && isRegister)

  console.log(`
  profile: ${isLoggedIn}
  login: ${showLogin}
  register: ${showRegister}
  `)

  useEffect(() => {
    setShowLogin(!isLoggedIn && !isRegister)
    setShowRegister(!isLoggedIn && isRegister)
  }, [isRegister, isLoggedIn])

  const navFilterCB = (link, idx) => {
    const isNotArray = ['Profile', 'Login', 'Register']
    const profile = link.text == 'Profile'
    const login = link.text == 'Login'
    const register = link.text == 'Register'

    console.log(!isNotArray.includes(link.text))
    const showOther = !isNotArray.includes(link.text)
    const showUserLink =
      (isLoggedIn && profile) || (showLogin && login) || (showRegister && register)
    return showUserLink || showOther
  }

  const handleRegisterChange = () => {
    setIsRegister(params.get('register') ?? false)
  }

  const navMapCB = (link, idx) => {
    const cPath = location.pathname == '/' ? 'home' : location.pathname
    const lPath = link.path == '/' ? 'home' : link.path.slice(0, cPath.length)
    // console.log(`currentPath/linkPath: '${cPath}' / '${lPath}'`)
    const className = cPath == lPath ? 'nav-link selected' : 'nav-link'

    return (
      <NavLink key={idx} onClick={handleRegisterChange} className={className} to={link.path}>
        {link.text}
      </NavLink>
    )
  }

  let navMap = navlinks.filter(navFilterCB).map(navMapCB)

  return (
    <nav className="navbar">
      <h1 className="nav-title">
        <NavLink className="nav-title-link" to="/">
          FitnessTrackr
        </NavLink>
      </h1>
      <div className="nav-container">{navMap}</div>
    </nav>
  )
}

export default Navbar
