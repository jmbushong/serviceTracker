import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Redirect } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import API_URL from "../../environment";

type AcceptedProps = {
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  sessionToken: any;
  setViewManageHours:  (e: any) => void;
  setViewStudentAccount:  (e: any) => void;
  setViewEventSchedule:  (e: any) => void;
  setViewSearch:  (e: any) => void;
};

type myState = {
  anchorE1: any;
  anchorOriginVertical: any;
  anchorOriginHorizontal: any;
  transformOriginVertical: any;
  transformOriginHorizontal: any;
  anchorReference: any;
};

class AdminSitebar extends React.Component<AcceptedProps, myState> {
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
          fetch(`${API_URL}/teacherUser/deleteadmin`,{
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
            const json= await response.json()
            console.log(json)
            console.log('Teacher is deleted')
         
        
    }
    catch(err){
      console.log(err)
    }
    try{
        
      const response= await 
      fetch(`${API_URL}/teacherUser/deleteclass`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json= await response.json()
        console.log(json)
        console.log('Class is deleted')
    }
    catch(err){
      console.log(err)
    }
    try{
        
      const response= await 
      fetch(`${API_URL}/teacherUser/deleteclassentries`,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const json= await response.json()
        console.log(json)
        console.log('Class entries are deleted')
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
        <AppBar style={{backgroundColor:"white"}} position="absolute">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton className="signupTitle" style={{fontSize: "20px"}}
             onClick={() => {
              this.props.setViewSearch(false );
              this.props.setViewManageHours(false );
              this.props.setViewEventSchedule(false );
              this.props.setViewStudentAccount(false );
           
            }}
          
            
          >ServiceTracker</IconButton>
            

{/*       
            {this.props.backArrowToggle === true ? (
              <Link to="/adminDash">
                <IconButton>
                  <ArrowBackIcon style={{ color: "black" }} />
                </IconButton>
                
              </Link>
            ) : (
              <div></div>
            )} */}
          
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
                <MenuItem onClick={()=>{this.deleteUser();  this.props.clearToken();}}>Delete Account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
   
        {this.checkForToken()}
      </React.Fragment>
    );
  }
}

export default AdminSitebar;
