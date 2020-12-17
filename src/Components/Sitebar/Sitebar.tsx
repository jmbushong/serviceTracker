import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"

type AcceptedProps={
  backArrowToggle: any;
  arrowHandler: any;
  clearToken: any;
  sessionToken: any;
}

class Sitebar extends React.Component<AcceptedProps, {}> {
  checkForToken = () => {
    if (!this.props.sessionToken) {
      return <Redirect to="/"/>;
    } else {
      return console.log("hello");
    }
  };



  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {this.props.backArrowToggle === true ? (
              <Link to="/myDashboard">
                <IconButton>
                  <ArrowBackIcon style={{ color: "white" }} />
                </IconButton>
              </Link>
            ) : (
              <div></div>
            )}
            <IconButton
              onClick={() => {
                this.props.clearToken();
               
              }}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              Logout
            </IconButton>
          </Toolbar>
        </AppBar>
        {this.checkForToken()}
      </React.Fragment>
    );
  }
}

export default Sitebar;
