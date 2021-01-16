import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";

//This component directs a user to the proper signup screen -- admin versus user


//This function is not currently being called.
//It contains the copyright.

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
      <Grid container component="main" style={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={5} lg={5} className="newLanding" />

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className="formPadding" style={{ marginTop: "150px" }}>
            <Typography
              className="signupTitle"
              style={{ marginTop: "0px" }}
              component="h1"
              variant="h5"
            >
              Choose Your Account Type:
            </Typography>
            <br></br>

            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}></Grid>

                <Grid item xs={6}>
                  <Link to="/signup">
                    <Button
                      style={{ height: "150px" }}
                      fullWidth
                      variant="contained"
                    >
                      STUDENT
                    </Button>{" "}
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    {" "}
                    <Link to="/adminsignup">
                      <Button
                        style={{ height: "150px" }}
                        fullWidth
                        variant="contained"
                      >
                        <Grid item xs={12}>
                          {" "}
                          TEACHER
                        </Grid>
                      </Button>
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>

              <Grid container justify="flex-end">
                <Grid
                  item
                  style={{ marginBottom: "50px" }}
                  className="smallMarginTop"
                >
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
      </Grid>
    );
  }
}

export default SelectRole;
