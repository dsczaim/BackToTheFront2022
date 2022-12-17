import React from "react";
import Logo from "../image/dsclogo.png";

import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardLink,
  CardText,
  Navbar,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";
export default function Nav() {
  return (
    <div>
      <Navbar className="my" color="dark" dark>
        <NavbarBrand href="/" className="mx-auto">
          <img
            alt="logo"
            src={Logo}
            style={{
              width: 40,
            }}
          />
        </NavbarBrand>
      </Navbar>
    </div>
  );
}
