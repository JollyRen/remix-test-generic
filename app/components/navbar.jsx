import { NavLink, useLocation } from '@remix-run/react'
import { navlinks } from '../utils/index'
const Navbar = ({ user, isLoggedIn }) => {
  let location = useLocation()

  const navFilterCB = (link, idx) =>
    isLoggedIn && (link.text == 'Login' || link.text == 'Register')
      ? false
      : !isLoggedIn && link.text == 'Profile'
      ? false
      : true

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
