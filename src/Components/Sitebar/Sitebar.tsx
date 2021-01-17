import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

// type myState = {
//   anchorE1: any;
//   setAnchorE1: (e: any) => void;
// };
type AcceptedProps = {
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  sessionToken: any;
};

type myState = {
  anchorE1: any;
  anchorOriginVertical: any;
  anchorOriginHorizontal: any;
  transformOriginVertical: any;
  transformOriginHorizontal: any;
  anchorReference: any;
};

class Sitebar extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      anchorE1: null,
      anchorOriginVertical: "bottom",
      anchorOriginHorizontal: "right",
      transformOriginVertical: "top",
      transformOriginHorizontal: "right",
      anchorReference: "anchorEl",
    };
  }

  deleteUser = async()=>{
    try{
      const response= await 
          fetch(`http://localhost:4000/user/delete`,{
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
            const json= await response.json()
            console.log(json)
            console.log('Profile is deleted')
    }
    catch(err){
      console.log(err)
    }
  
  }

  checkForToken = () => {
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else {
      return console.log("hello");
    }
  };

  handleMenu = (e: any) => {
    this.setState({ anchorE1: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorE1: null });
  };

  render() {
    const { anchorE1 } = this.state;
    const open = Boolean(this.state.anchorE1);
    return (
      <React.Fragment>
        <nav style={{backgroundColor:"#fafafa"}}   >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          
            {this.props.backArrowToggle === true ? (
              <Link to="/myDashboard">
                <IconButton>
                  <ArrowBackIcon style={{ color: "black" }} />
                </IconButton>
              </Link>
            ) : (
              <div></div>
            )}
          
            <div>
              <IconButton onClick={this.handleMenu}>
                <MenuIcon style={{color:"black"}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorE1}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem
                  onClick={() => {
                    this.props.clearToken();
                  }}
                >
                  Logout 
                </MenuItem>
                <MenuItem   onClick={() => {
                    this.deleteUser();
                    this.props.clearToken();
                  }}>Delete Account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </nav>
        {this.checkForToken()}
      </React.Fragment>
    );
  }
}

export default Sitebar;
