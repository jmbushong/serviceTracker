import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Falcon from "../../Assets/White Falcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Link
 
 } from "react-router-dom";
 import { faBookOpen} from "@fortawesome/free-solid-svg-icons";

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
      <div style={{marginTop: "50px"}} className="formPadding">
        <Typography className="signupTitle" component="h1" variant="h6">
          Choose Your Account Type:
        </Typography>
        <br></br>
        
        <form noValidate>
          <Grid container spacing={2}>
         
        
            <Grid item xs={6}>
              
            <Link to="/signup">
            <Button style={{height: '150px'}}  fullWidth variant="contained" >
           STUDENT
          </Button> </Link>
         
            </Grid>
            <Grid item xs={6} >
              <div >   <Link to="/adminsignup">
            <Button style={{height: '150px'}} fullWidth variant="contained" >
            
            <Grid item xs={12}>  TEACHER</Grid>
            
          </Button>
         </Link></div>
        
      
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
