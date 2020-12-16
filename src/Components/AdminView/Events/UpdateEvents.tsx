import React, { Component } from "react";
import Sitebar from "../../Sitebar/Sitebar";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    Link
   } from "react-router-dom";

class UpdateEvents extends React.Component {
  render() {
    return (
      <div>
        {/* <Sitebar /> */}
        <Container style={{paddingLeft:"40px", paddingRight:"40px"}}component="main" maxWidth="xs">
          <CssBaseline />
          <div style={{ marginTop: "25px" }}>
            <Typography
           
              component="h1"
              variant="h5"
            >
              Edit Event
            </Typography>
        
            <br></br>
            <br></br>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <form noValidate>
                    <TextField
                      id="date"
                      label="Date of Service"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <FormControl style={{minWidth:160}} >
                    <InputLabel id="demo-simple-select-label">Type of Service</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    //   value={age}
                    //   onChange={handleChange}
                    >
                      <MenuItem value={10}>Tutoring</MenuItem>
                      <MenuItem value={20}>Recycling</MenuItem>
                      <MenuItem value={30}>NJHS Sponsored Event</MenuItem>
                      <MenuItem value={30}>Other</MenuItem>
                    </Select>
                  </FormControl>{" "}
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Decription of Service"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl style={{minWidth:160, marginBottom:"25px"}} >
                    <InputLabel id="demo-simple-select-label">Number of Hours</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    //   value={age}
                    //   onChange={handleChange}
                    >
                      <MenuItem value={10}>0.5</MenuItem>
                      <MenuItem value={20}>1</MenuItem>
                      <MenuItem value={30}>1.5</MenuItem>
                      <MenuItem value={30}>2</MenuItem>
                      <MenuItem value={30}>2.5</MenuItem>
                      <MenuItem value={30}>3</MenuItem>
                      <MenuItem value={30}>3.5</MenuItem>
                      <MenuItem value={30}>4</MenuItem>
                      <MenuItem value={30}>4.5</MenuItem>
                      <MenuItem value={30}>5</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
              </Grid>
              <Link to="/mydashboard"><Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update 
              </Button></Link>
              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default UpdateEvents;
