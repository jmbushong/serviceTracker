import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

type AcceptedProps={
  backArrowToggle:any, 
  arrowHandler: any
}

class Sitebar extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
    
    console.log("[App.js] Constructor");
  }


  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {this.props.backArrowToggle === true ? (
              <Link to="/mydashboard">
                <IconButton>
                  <ArrowBackIcon style={{ color: "white" }} />
                </IconButton>
              </Link>
            ) : (
              <div></div>
            )}

            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Sitebar;
