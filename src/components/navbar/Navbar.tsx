import { Container, Nav, Navbar as Nb, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import shopLogo from "../../assets/logo.jpg";
//import cartImage from "../../assets/cart.png"
import loginIcon from "../../assets/login.png";
import logoutIcon from "../../assets/logout.png";
import userIcon from "../../assets/user.png";
import SearchBar from "./SearchBar.tsx";
import { useState } from "react";
//import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  //const navigate = useNavigate();
  const [logged_in, set_logged_in] = useState(false);
  const [name, set_name] = useState<string>("");

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  const handleSearch = (query: string) => {
    // You can perform the search logic here
    console.log("Searching for:", query);
    if (query === "logout") {
      set_logged_in(false);
    } else if (query === "login") {
      set_logged_in(true);
    } else {
      set_logged_in(true);
      set_name(query);
    }
    handleNavLinkClick();
    // For example, you can navigate to a search results page
    //navigate(`/about-us`);
  };

  return (
    <Nb expand="md" fixed="top" className="bg-white shadow-sm navbar">
      <Container className="d-flex justify-content-between align-items-center">
        <Nb.Brand href="/">
          <img id="navbar-logo" src={shopLogo} alt="ASOS logo" />
        </Nb.Brand>
        <Nb.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
        <Nb.Collapse in={!isCollapsed} id="basic-navbar-nav">
          <Nav>
            <Nav.Link
              to="/about-us"
              as={NavLink}
              className="nav-link"
              onClick={handleNavLinkClick}
            >
              O nás
            </Nav.Link>
            <Nav.Link
              to="/contact"
              as={NavLink}
              className="nav-link"
              onClick={handleNavLinkClick}
            >
              Kontakt
            </Nav.Link>
          </Nav>
          <SearchBar onSearch={handleSearch} />
          {logged_in ? (
            <NavDropdown
              title={
                <>
                  <img src={userIcon} alt="Logout" className="log-icon me-2" />
                  <span className="log-text">{name}</span>
                </>
              }
              id="nav-dropdown"
              className="ms-auto drop-down"
            >
              <NavDropdown.Item
                as={Link}
                to="/orders"
                onClick={handleNavLinkClick}
              >
                Objednávky
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/profile"
                onClick={handleNavLinkClick}
              >
                Môj profil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/logout"
                onClick={handleNavLinkClick}
                className="log-component ms-auto"
              >
                <img
                  alt="logout"
                  src={logoutIcon}
                  className="log-icon d-inline-block align-top"
                />
                <span className="log-text">Odhlásiť sa</span>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nb.Brand
              className="nav-link log-component ms-auto"
              as={Link}
              to="/login"
              onClick={handleNavLinkClick}
            >
              <img
                alt="login"
                src={loginIcon}
                className="log-icon d-inline-block align-top"
              />
              <span className="log-text">Prihlásiť sa</span>
            </Nb.Brand>
          )}
        </Nb.Collapse>
      </Container>
    </Nb>
  );
};

export default Navbar;
