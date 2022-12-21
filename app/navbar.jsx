import { Link } from '@remix-run/react'
import { useState } from 'react'

const Navbar = ({ user }) => {
  const [navlinks, setNavlinks] = useState([
    { path: '/', text: 'Home', className: 'nav-link' },
    { path: '/routines', text: 'Routines', className: 'nav-link' },
    { path: '/activities', text: 'Activities', className: 'nav-link' },
    { path: '/login', text: 'Login', className: 'nav-link' },
    { path: '/register', text: 'Register', className: 'nav-link' },
    { path: '/profile', text: 'Profile', className: 'nav-link' }
  ])

  const changeNavLink = (oldLinks, idx) => {
    // console.log('starting new change')
    // console.log(oldLinks)
    const newLinks = [...oldLinks]
    for (const [i, el] of newLinks.entries()) {
      // console.log('before', idx, i, el)
      if (idx == i) newLinks[i].className = 'nav-link selected'
      else newLinks[i].className = 'nav-link'
      // console.log('after', idx, i, el)
    }
    // console.log(newLinks)
    return newLinks
  }
  // const selected = useRef()
  // console.log(selected)
  return (
    <nav className="navbar">
      <h1 className="nav-title">
        <Link
          className="nav-title-link"
          onClick={() => {
            setNavlinks(changeNavLink(navlinks))
          }}
          to="/">
          FitnessTrackr
        </Link>
      </h1>
      <ul className="nav-container">
        {navlinks.map((link, idx) => {
          return (
            <li className="nav-item" key={idx}>
              <Link
                to={link.path}
                onClick={() => {
                  setNavlinks(changeNavLink(navlinks, idx))
                }}
                className={link.className}>
                {link.text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
