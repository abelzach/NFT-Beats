import React from 'react';
import { Navbar, Container,Nav, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <h2>NFT-Beats</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/register">Register</Nav.Link>&nbsp;
                    <Nav.Link href="/create">Create new NFT</Nav.Link>&nbsp;
                    <Nav.Link href="/verify">Verify</Nav.Link>&nbsp;
                    <NavDropdown title="Tracks" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="alltracks">All tracks</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="mytracks">Your tracks</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="/offersP">Your Offers</Nav.Link>&nbsp;
                </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
}