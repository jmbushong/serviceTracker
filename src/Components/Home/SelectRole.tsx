import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Falcon from "../../Assets/White Falcon.png";
import {
  Link
 
 } from "react-router-dom";

 function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


class SelectRole extends React.Component {
  render() {
    return (
      <div> 

  
      <div className= "mainDiv" >
      
       
      <Container className="auth" component="main" maxWidth="xs">
      <CssBaseline />
      
         
      <div className="falconpic"> <img src={Falcon} style={{width: '10em',  borderRadius: "30%"}}></img>
      
      
      </div>
      <div className="formPadding">
        <Typography className="signupTitle" component="h1" variant="h6">
          Choose Your Account Type:
        </Typography>
        <br></br>
        
        <form noValidate>
          <Grid container spacing={2}>
         
        
            <Grid item xs={12}>
            <Link to="/studentpin">
            <Button fullWidth variant="contained" >
           STUDENT
          </Button> </Link>
        
         
            </Grid>
            <Grid item xs={12}>
            <Link to="/adminsignup">
            <Button  fullWidth variant="contained" >
            TEACHER
          </Button></Link>
        
      
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
    
        
      

          <Grid container justify="flex-end">
            <Grid item className="smallMarginTop">
            <Link to="/">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={5}>
  <Copyright />
</Box>
      </div>
    
      </Container>


</div>
  </div>

    );
  }
}

export default SelectRole;
