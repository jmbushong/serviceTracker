import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Falcon from "../../Assets/White Falcon.png";
import Box from "@material-ui/core/Box";
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


class StudentPin extends React.Component {
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
          Find Your Group
        </Typography>
        <br></br>
        
        <form noValidate>
          <Grid container spacing={2}>
         
        
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="Code"
                label="ENTER CODE "
                type="password"
                id="password"
                autoComplete="current-password"
              />
        
         
            </Grid>
            <Grid item xs={12}>
        
        
      
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Link to= "/signup">
          <Button fullWidth variant="contained" color="primary">
          <ArrowForwardIcon />
          </Button></Link>
        
      

          <Grid container justify="flex-end">
            <Grid item>
            <Link className="smallMarginTop" to="/">
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

export default StudentPin;
