import React, { Component } from "react";
import Sitebar from "../../Sitebar/Sitebar";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
  setBackArrowToggle:(e:any)=>void;
  setIsAdminFalse: any;
  isAdmin: any;
  sessionToken?: any;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  date: any;
  typeOfService: any;
  description: any;
  hours: any;
  status: any;
  studentUserId: any;
  setDate: (e: any) => void;
  setTypeOfService: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setStatus: (e: any) => void;
};

type myState={
  serviceUpdate:boolean;
  setServiceUpdate:(e:any)=> void;
}

class AddServiceHours extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      serviceUpdate:false,
      setServiceUpdate: (e) => {this.setState({serviceUpdate: e})}
    };
 
  }
  componentDidMount() {
    this.props.setBackArrowToggle(true) 
    this.props.setIsAdminFalse(false);
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/service`, {
      method: "POST",
      body: JSON.stringify({
        service: {
          date: this.props.date,
          typeOfService: this.props.typeOfService,
          description: this.props.description,
          hours: this.props.hours,
          status: this.props.status,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service submission was successful");
        this.state.setServiceUpdate(true);
        //set each prop to empty
        this.props.setDate("")
        this.props.setHours(0)
        this.props.setTypeOfService("")
        this.props.setDescription("")
      } else {
        console.log("Service submission failed");
      }
      return response.json();
    });
  };
  checkForServiceEntry=() => {
    if (this.state.serviceUpdate){
      return <Redirect to="/mydashboard"/>
    }
  }

  render() {
    return (
      <div>
        <Sitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Container
          style={{ paddingLeft: "40px", paddingRight: "40px" }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <div style={{ marginTop: "25px" }}>
            <Typography component="h1" variant="h4" className="signupTitle">
              Add Service Entry
            </Typography>

            <br></br>
            <br></br>
            <form onSubmit={this.handleSubmit} noValidate>
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
                      onChange={(e) => {
                        console.log(e.target.value);
                        this.props.setDate(e.target.value);
                        console.log(this.props.date);
                        console.log(e.target.value);
                      }}
                      defaultValue={0}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: 160 }}>
                    <InputLabel id="demo-simple-select-label">
                      Type of Service
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => {
                        console.log(e.target.value);
                        this.props.setTypeOfService(e.target.value);
                        console.log(this.props.typeOfService);
                        console.log(e.target.value);
                      }}
                      defaultValue={" "}
                    >
                      <MenuItem value={"Tutoring"}>Tutoring</MenuItem>
                      <MenuItem value={"Recycling"}>Recycling</MenuItem>
                      <MenuItem value={"NJHS Sponsored Event"}>
                        NJHS Sponsored Event
                      </MenuItem>
                      <MenuItem value={"Volunteering"}>
                        Volunteering
                      </MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="description"
                    label="Description of Service"
                    id="text"
                    onChange={(e) => {
                      this.props.setDescription(e.target.value);
                      console.log(this.props.description);
                    }}
                    defaultValue={" "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: 160, marginBottom: "25px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Number of Hours
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => {
                        console.log(e.target.value);
                        this.props.setHours(e.target.value);
                        console.log(this.props.hours);
                        console.log(e.target.value);
                      }}
                      defaultValue={0}
                    >
                      <MenuItem value={1}>1 hour </MenuItem>
                      <MenuItem value={2}>2 hours </MenuItem>
                      <MenuItem value={3}>3 hours</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
              </Grid>
              {/* <Link to="/mydashboard"> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{backgroundColor: "#ef476f", color: "white"}}
                >
                 <h3>Submit</h3> 
                </Button>
              {/* </Link> */}
              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
        {console.log(this.props.typeOfService)}
        {console.log(this.props.hours)}
        {console.log(this.props.description)}
        {this.checkForServiceEntry()}
      </div>
    );
  }
}

export default AddServiceHours;
