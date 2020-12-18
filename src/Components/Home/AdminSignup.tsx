import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Falcon from "../../Assets/White Falcon.png";
import { Redirect } from "react-router-dom"
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
  
  type AcceptedProps={
    sessionToken:any, 
    updateToken:any,
    email:any,
    firstName: string,
    lastName: string, 
    password: any,
    setEmail: any,
    setPassword: any,
    classCode?:any,
    setClassCode?:any,
    setFirstName?: any,
    setLastName?: any,
    setTeacherProfile: (e: any) => void,
  teacherAccount: any
  
  }
  


  




  


class AdminSignup extends React.Component <AcceptedProps,{}>{
 
  handleSubmit =(event:any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/teacheruser/signup`,{
        method: 'POST', 
        body: JSON.stringify({
          teacherUser: {
            firstName: this.props.firstName, 
            lastName: this.props.lastName, 
            email: this.props.email,
            password: this.props.password
           
          }}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        (response) => response.json()
  
    ).then((json)=>{
       
        if (json !== undefined) {
          this.props.setTeacherProfile(json); //taking information from the server and setting it to our state
        } else {
          this.props.setTeacherProfile([]);
        }
        this.props.updateToken(json.sessionToken)
        console.log(this.props.teacherAccount.teacherUser?.classId)
      });
    }
  



checkForToken= () =>{
    if(!this.props.sessionToken || this.props.firstName === undefined ){
      return ( <Redirect to= "/adminsignup"/>)
    }return(<Redirect to= "/admindash"/>)
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
                NJHS ServiceTracker
              </Typography>
              <br></br>
              <form onSubmit={this.handleSubmit}  noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => {
                        this.props.setFirstName(e.target.value)
                        console.log(this.props.firstName)
                    
                      }}
                      defaultValue={this.props.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={(e) => {
                        this.props.setLastName(e.target.value)
                        console.log(this.props.lastName)
                    
                      }}
                      defaultValue={this.props.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        this.props.setEmail(e.target.value)
                        console.log(this.props.email)
                    
                      }}
                      defaultValue={this.props.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        this.props.setPassword(e.target.value)
                        console.log(this.props.password)
                    
                      }}
                      defaultValue={this.props.password}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                {/* <Link to="/teacherpin"> */}
                <Button
               
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Admin Sign Up
                </Button> 
                {/* </Link> */}
        
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
{this.checkForToken()}
  </div>
    );
  }
}

export default AdminSignup;
