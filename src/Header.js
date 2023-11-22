import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './logo/logo.png'

export const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user-info'));
  function logout() {
    localStorage.clear();
    navigate("/login")
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#"><img src={logo} style={{width:90}} /></Navbar.Brand>
          <Nav className="me-auto navbar-wrapper">
            {

              localStorage.getItem('user-info') ?
                <>
                  <Link to="/">Product List</Link>
                  <Link to="/add">Add Poduct</Link>
                  <Link to="/update/:i">Update Product</Link>
                </> :
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            }


          </Nav>
          {
            localStorage.getItem('user-info') ?
              <Nav>
                <NavDropdown title={user && user.name}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>

                </NavDropdown>
              </Nav> : null


          }

        </Container>

      </Navbar>
    </div>
  )
}
