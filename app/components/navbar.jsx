import { NavLink, useLocation } from '@remix-run/react'

import { navlinks } from '../utils/index'

const Navbar = ({ localState }) => {
  const {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    tokenState: [token, setToken],
    registerState: [isRegister]
  } = localState

  let location = useLocation()

  // console.log(`
  // profile: ${isLoggedIn}
  // login: ${showLogin}
  // register: ${showRegister}
  // `)

  const navFilterCB = (link, idx) => {
    const profile = link.text == 'Profile'
    const login = link.text == 'Login'
    const register = link.text == 'Register'

    const isShowLogin = !isLoggedIn && !isRegister && login
    const isShowRegister = !isLoggedIn && isRegister && register
    const isShowProfile = isLoggedIn && profile

    const showUserLink = isShowLogin || isShowRegister || isShowProfile

    return showUserLink || (!profile && !login && !register)
  }

  const navMapCB = (link, idx) => {
    const cPath = location.pathname == '/' ? 'home' : location.pathname
    const lPath = link.path == '/' ? 'home' : link.path.slice(0, cPath.length)
    // console.log(`currentPath/linkPath: '${cPath}' / '${lPath}'`)
    const className = cPath == lPath ? 'nav-link selected' : 'nav-link'

    return (
      <NavLink key={idx} className={className} to={link.path}>
        {link.text}
      </NavLink>
    )
  }

  let navMap = navlinks.filter(navFilterCB).map(navMapCB)

  const handleLogOut = () => {
    setToken('')
    setUser({})
    setIsLoggedIn(false)
    localStorage.removeItem('token')
  }

  return (
    <nav className="navbar">
      <h1 className="nav-title">
        <NavLink className="nav-title-link" to="/">
          FitnessTrackr
        </NavLink>
      </h1>
      <div className="nav-container">
        {navMap}
        {isLoggedIn && (
          <NavLink to="/" className="nav-link" onClick={handleLogOut}>
            Log Out
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Navbar
