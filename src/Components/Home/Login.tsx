import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Falcon from "../../Assets/White Falcon.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

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
  setPassword: any
}

class Login extends React.Component<AcceptedProps,{}> {
  constructor(props: AcceptedProps) {
    super(props);
    
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
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}></Grid>
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
         <Link to="./admindash"> <Button type="submit" fullWidth variant="contained" color="primary">
            Member Login
          </Button></Link>

          <Grid container justify="flex-end">
            <Grid item className="smallMarginTop">
            <Link  to="/selectrole">
                {"Need an account? Sign up"}
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

export default Login;
