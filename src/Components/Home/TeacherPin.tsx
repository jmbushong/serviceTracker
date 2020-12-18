import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Falcon from "../../Assets/White Falcon.png";
import Grid from "@material-ui/core/Grid";
import {
  Link
 
 } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


type myProps={
  sessionToken:any,
  teacherAccount: any
}



class TeacherPin extends React.Component<myProps,{}> {

  componentDidMount(){
    console.log(this.props.teacherAccount.teacherUser?.classId)
  }
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
          CLASS CODE:
          {this.props.teacherAccount.teacherUser?.classId}
        </Typography>
        <h5 className="signupTitle"> Students will use this code to join your group. </h5>
        <br></br>
        
        <form noValidate>
          <Grid container spacing={2}>
         
        
            <Grid item xs={12}>
            <h1 className="signupTitle"></h1>
         
            </Grid>
            <Grid item xs={12}>
        
        
      
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Link to="/chart">
          <Button fullWidth variant="contained" color="primary">
          <ArrowForwardIcon />
          </Button></Link>
        
      

          <Grid container justify="flex-end">
            <Grid item>
      
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

export default TeacherPin;
