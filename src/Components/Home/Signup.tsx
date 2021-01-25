import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../../environment";

//This component is where a STUDENT would create an account

type AcceptedProps = {
  sessionToken: any;
  updateToken: any;
  email: any;
  firstName: string;
  lastName: string;
  password: any;
  setEmail: any;
  setPassword: any;
  classCode?: any;
  setClassCode?: any;
  setFirstName?: any;
  setLastName?: any;
  setIsAdminFalse: (e: any) => void;
};

//This is the copyright function. It is not currently being shown on screen.

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © ServiceTracker "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Signup extends React.Component<AcceptedProps, {}> {
  //This fetch CREATES a student user. They are then linked to the correct group through the class code.
  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`${API_URL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({
        studentUser: {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          password: this.props.password,
          classId: this.props.classCode,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.setIsAdminFalse(false);
        this.props.updateToken(json.sessionToken);
      });
  };

  //This function checks to see if an account has been successfully created (ie student has session token)
  //It then pushes the user to the proper viewpoint
  checkForToken = () => {
    if (!this.props.sessionToken || this.props.firstName === undefined) {
      return <Redirect to="/signup" />;
    }
    return <Redirect to="/myDashboard" />;
  };

  render() {
    return (
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={5} lg={5} className="newLanding" />

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="formPadding">
            <Typography
              className="signupTitle"
              component="h1"
              style={{ marginTop: "35px" }}
              variant="h4"
            >
              Student Sign-Up
            </Typography>
            <br></br>
            <form onSubmit={this.handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
              
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => {
                      this.props.setFirstName(e.target.value);
                      console.log(this.props.firstName);
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
                    autoComplete="off"
                    onChange={(e) => {
                      this.props.setLastName(e.target.value);
                      console.log(this.props.lastName);
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
                    autoComplete="off"
                    onChange={(e) => {
                      this.props.setEmail(e.target.value);
                      console.log(this.props.email);
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
                    autoComplete="off"
                    onChange={(e) => {
                      this.props.setPassword(e.target.value);
                      console.log(this.props.password);
                    }}
                    defaultValue={this.props.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Code"
                    label="Enter Class Code "
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => {
                      this.props.setClassCode(e.target.value);
                      console.log(this.props.setClassCode);
                    }}
                    defaultValue={this.props.classCode}
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              {/* <Link to="/mydashboard"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                Sign Up
              </Button>
              {/* </Link> */}

              <Grid container justify="flex-end">
                <Grid item className="smallMarginTop">
                  <Link to="/">{"Already have an account? Sign in"}</Link>
                </Grid>
              </Grid>
            </form>
        
          </div>
        </Container>

        {/* <div
          style={{
            backgroundColor: "#222222",
            color: "#222222",
            position: "fixed",
            bottom: "0",
            width: "100%",
            height: "30px",
          }}
        >
          <Copyright />
        </div> */}
        {this.checkForToken()}
      </Grid>
    );
  }
}

export default Signup;
