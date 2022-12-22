import { Link } from '@remix-run/react'
import { useState } from 'react'

const Navbar = ({ user, isLoggedIn }) => {
  const [navlinks, setNavlinks] = useState([
    { path: '/', text: 'Home', className: 'nav-link' },
    { path: '/routines', text: 'Routines', className: 'nav-link' },
    { path: '/activities', text: 'Activities', className: 'nav-link' },
    { path: '/users/login', text: 'Login', className: 'nav-link' },
    { path: '/users/profile', text: 'Profile', className: 'nav-link' }
  ])

  const changeNavLink = (oldLinks, idx) =>
    oldLinks.map((link, i) =>
      idx == i ? (link.className = 'nav-link selected') : (link.className = 'nav-link')
    )

  const handleLogoNavChange = () => setNavlinks(changeNavLink(navlinks))

  //map nav util
  const mapNavCB = (link, idx) => {
    const handleNavChange = () => setNavlinks(changeNavLink(navlinks, idx))
    return (
      <li className="nav-item" key={idx}>
        <Link to={link.path} onClick={handleNavChange} className={link.className}>
          {link.text}
        </Link>
      </li>
    )
  }

  const filterNavCB = (link) =>
    isLoggedIn && link.text == 'Login'
      ? false
      : !isLoggedIn && link.text == 'Profile'
      ? false
      : true

  const mapNav = navlinks.filter(filterNavCB).map(mapNavCB)

  return (
    <nav className="navbar">
      <h1 className="nav-title">
        <Link className="nav-title-link" onClick={handleLogoNavChange} to="/">
          FitnessTrackr
        </Link>
      </h1>
      <ul className="nav-container">{mapNav}</ul>
    </nav>
  )
}

export default Navbar
