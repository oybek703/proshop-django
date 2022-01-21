import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../redux/actions'
import {useNavigate} from 'react-router-dom'
import SearchBox from './SearchBox'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userInfo)
    function handleLogout() {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container className='d-flex justify-content-between'>
                    <LinkContainer to='/'  style={{fontSize: '2rem', fontWeight: 'bold', color: '#eee'}}>
                        <Navbar.Brand>PROSHOP</Navbar.Brand>
                    </LinkContainer>
                    <SearchBox/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"/>&nbsp;CART</Nav.Link>
                            </LinkContainer>
                            {user ? (
                                <NavDropdown title={user.name.toUpperCase()} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>&nbsp;LOGIN</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link><i className="fas fa-user-plus"></i>&nbsp;REGISTER</Nav.Link>
                                    </LinkContainer>
                                </>
                                )}
                            {user && user.is_admin && (
                                <NavDropdown title='ADMIN' id='adminmenue'>
                                    <LinkContainer to='/admin/users'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/products'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orders'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                            {false && <NavDropdown title={'USERNAME'} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/logout'>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
