import React from 'react'

const Navbar = ({account}) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <p className="navbar-brand my-auto">TodoList dApp</p>
      <ul className="navbar-nav">
        <li className="nav-item text-white">{account}</li>
      </ul> 
    </nav>
  )
}

export default Navbar