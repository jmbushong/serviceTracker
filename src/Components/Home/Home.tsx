import React, { Component } from "react";


import CssBaseline from "@material-ui/core/CssBaseline";


import Link from "@material-ui/core/Link";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";

import Falcon from "../../Assets/White Falcon.png";
import Signup from "../Home/Signup";
import Login from "../Home/Login";
import SelectRole from "../Home/SelectRole"
import StudentPin from "../Home/StudentPin"
import TeacherPin from "../Home/TeacherPin"
import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
   ServiceTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Home extends React.Component {
  render() {
    return (
      <div className= "mainDiv" >

   
          <Container className="auth" component="main" maxWidth="xs">
            <CssBaseline />
           
               
            <div className="falconpic"> <img src={Falcon} style={{width: '10em',  borderRadius: "30%"}}></img>
            
            
            </div>
          <div className="formPadding">
            <Switch>
              <Route path="/" component={Signup}/>
              <Route path="/login" component={Login}/>

            </Switch>
            {/* <Signup /> */}
            {/* <Login /> */}
            {/* <SelectRole /> */}
            {/* <StudentPin /> */}
            {/* <TeacherPin /> */}
            
        
               
            <Box mt={5}>
              <Copyright />
            </Box>
            </div>
          </Container>
       
      </div>
    );
  }
}

export default Home;
