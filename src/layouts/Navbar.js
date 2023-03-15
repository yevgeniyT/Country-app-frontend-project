import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/favorite">Favorite</NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar