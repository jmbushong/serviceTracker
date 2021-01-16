import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

//This component appears on the page as soon as a user arrives to the site


//This function is not currently being called.
//It contains the copyright.

function Copyright() {
  return (
    <div>
      <Typography variant="body2" align="center"></Typography>
      <Typography variant="body2" align="center">
        {"Copyright © ServiceTracker "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

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
  collectToken: any;
  isAdmin: any;
  setIsAdminTrue: any;
  setIsAdminFalse: any;
  setTeacherProfile: (e: any) => void;
};

class Login extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }

  //Nested Fetches- This setup allows a student & a teacher to log in using the same form.
  //It takes the inputted information, determines if student or teacher, and then shows proper page
  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/user/login`, {
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
      .then((response) => {
        if (response.status === 200) {
          console.log("Login was successful");
        } else {
          console.log("Login in failed");
        }
        return response.json();
      })
      .then((json) => {
        this.props.setIsAdminFalse(false);
        this.props.updateToken(json.sessionToken);
        if (this.props.sessionToken) {
          console.log("yes");
        } else {
          return fetch(`http://localhost:4000/teacheruser/login`, {
            method: "POST",
            body: JSON.stringify({
              teacherUser: {
                email: this.props.email,
                password: this.props.password,
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                console.log("Login was successful");
              } else {
                console.log("Login in failed");
              }
              return response.json();
            })
            .then((json) => {
              this.props.setIsAdminTrue(true);

              if (json !== undefined) {
                this.props.setTeacherProfile(json);
              } else {
                this.props.setTeacherProfile([]);
              }
              this.props.updateToken(json.sessionToken);
            });
        }
      });
  };

  //This function searches to see if the user has a session token.
  //It then checks the status of isAdmin and pushes user to the appropriate page
  checkForToken = () => {
    if (!this.props.sessionToken || this.props.isAdmin === "") {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  };

  render() {
    return (
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={6}
          md={5}
          lg={5}
          className="newLanding"
        ></Grid>

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="formPadding">

            <Typography
              className="signupTitle"
              style={{ marginTop: "150px" }}
              component="h1"
              variant="h4"
            >
              ServiceTracker
            </Typography>
            <Typography style={{ fontSize: "9pt", textAlign: "center" }}>
              {" "}
              Easily tracks your hours, so you can focus on <i>
                doing good.
              </i>{" "}
            </Typography>
            <br></br>

            <form onSubmit={this.handleSubmit} noValidate>
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
                    autoComplete="current-password"
                    onChange={(e) => {
                      this.props.setPassword(e.target.value);
                      console.log(this.props.password);
                    }}
                    defaultValue={this.props.password}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              {/* <Link to="./admindash"> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#ef476f", color: "white" }}
              >
                Member Login
              </Button>
              <br></br>

              {/* </Link> */}

              <Grid container justify="flex-end">
                <Grid item className="smallMarginTop">
                  <Link to="/selectrole"> {"Need an account? Sign up"}</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
{/* 
        <div
          style={{
            // backgroundColor: "#222222",
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

export default Login;