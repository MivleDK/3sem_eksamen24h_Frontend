import React, { useState } from "react";
import "./style2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from "react-bootstrap";
import ContactCrud from "./ContactCrud";
import OpportunityCrud from "./OpportunityCrud";
import Login from "./Login";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";

const Header = ({ isLoggedIn, loginMsg, isAdmin, loginName }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" id="header">
        <Navbar.Brand href="#home">Hold E, Gruppe 8</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink
            className="nav-link"
            exact
            activeClassName="selected"
            href="/"
            to="/"
          >
            Home
          </NavLink>
          {isAdmin && (
            <>
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="selected"
                  to="/contactCrud"
                >
                  Contacts
                </NavLink>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="selected"
                  to="/opportunityCrud"
                >
                  Opportunities
                </NavLink>
              </li>
            </>
          )}
          <NavLink
            className="nav-link"
            activeClassName="selected"
            to="/login-out"
          >
            {loginMsg}
          </NavLink>
          {isLoggedIn && (
            <>
              <li className="floatRight">
                <span>Logged in as {loginName}</span>
              </li>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginName, setLoginName] = useState("");

  let history = useHistory();

  const setLoginStatus = (status, name) => {
    setIsLoggedIn(status);
    setLoginName(name);
    history.push("/");
  };

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    history.push("/");
  };

  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        loginName={isLoggedIn ? loginName : ""}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/contactCrud">
            <AdminContactCrud />
          </Route>
          <Route path="/opportunityCrud">
            <AdminOpportunityCrud />
          </Route>          
          <Route path="/login-out">
            <Login
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
              setAdminStatus={setAdminStatus}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="pageContent">
      <Container>
        <Row>
          <Col>
            <h2>Home</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Welcome to this Customer relation management system (CRM)
              <br />
              Please log in to get started
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function AdminContactCrud() {
  return (
    <div className="pageContent">
      <ContactCrud />
    </div>
  );
}

function AdminOpportunityCrud() {
  return (
    <div className="pageContent">
      <OpportunityCrud />
    </div>
  );
}