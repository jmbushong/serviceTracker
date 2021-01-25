import React, { Component } from "react";
import Sitebar from "../../Sitebar/Sitebar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";
import API_URL from "../../../environment";

type AcceptedProps = {
  indexNumber:any;
  setIsAdminFalse: any;
  isAdmin:any;
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
  serviceRequests: any;
  setDate: (e: any) => void;
  setTypeOfService: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setStatus: (e: any) => void;
  setServiceRequests: (e: any) => void;
  setSpecificEntry?:(e:any)=>void;
  specificEntry?:any;
  setBackArrowToggle:(e:any)=>void; 
};

type myState={
  serviceUpdate:boolean;
  setServiceUpdate:(e:any)=> void;
  setEntryById:(e:any)=> void;
  setDate:(e:any)=> void;
  setTypeOfService:(e:any)=> void;
  setDescription:(e:any)=> void;
  setHours:(e:any)=> void;
  entryById:any;
  date: any;
  typeOfService: any;
  description: any;
  hours: any;
}



class UpdateServiceHours extends React.Component <AcceptedProps, myState>{
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      serviceUpdate:false,
      setServiceUpdate: (e) => {this.setState({serviceUpdate: e})},
      entryById: [],
      setEntryById: (e) => {this.setState({entryById: e})},
      date: "",
      setDate: (e) => {this.setState({date: e})},
      typeOfService: "",
      setTypeOfService: (e) => {this.setState({typeOfService: e})},
      description: "",
      setDescription: (e) => {this.setState({description: e})},
      hours: 0,
      setHours: (e) => {this.setState({hours: e})},
    };
 
  }
  fetchServiceRequests = () =>{
    fetch(`${API_URL}/service/${this.props.indexNumber}`, {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
        })
    }).then((res=> res.json()))
    .then((json) => {
      this.state.setEntryById(json);
      this.state.setHours(json.hours);
      this.state.setTypeOfService(json.typeOfService);
      this.state.setDescription(json.description);
      this.state.setDate(json.date)
      console.log(this.state.entryById)
        // console.log(json)
        // this.props.setServiceRequests(json) //taking information from the server and setting it to our state
        // console.log(this.props.indexNumber)
        
    })
}

//When the page loads run another fetch GET request BY ID (indexNumber) Get 1 by id in controller
//local state variables this.state.hours
//this makes it so variables aren't fighting one another We can use local state variables here so it doesn't hold onto old information

//Another option is to make the update button disabled until a user updates a value. When something is changed in the text box a clicker ticks up 1 and then it can be clicked


// ${this.props.serviceRequests.id}
  handleSubmit = (event: any) => {
    event.preventDefault();
  
    type serviceInterface = {
      date?: string, 
      typeOfService?: string,
      description?: string,
      hours?: number,
      status?: string

    }

    let service: serviceInterface={};
    // service.date= "";
    


    // if(this.props.date !== ""){
    //   service.date= this.state.entryById.date
    // } else{service.date= this.state.date}

    // if(this.props.typeOfService !== ""){
    //   service.typeOfService= this.state.entryById.typeOfService
    // }else{service.typeOfService= this.state.typeOfService}

    // if(this.props.description !== ""){
    //   service.description= this.state.entryById.description
    // }else{service.description= this.state.description}

    // if(this.props.hours !== 0){
    //   service.hours= this.state.entryById.hours
    // }else{service.hours= this.state.hours}

    fetch(`${API_URL}/service/${this.props.indexNumber}`, {
      method: "PUT",
      body: JSON.stringify({
        // service
        service: {
          date: this.state.date,
          typeOfService: this.state.typeOfService,
          description: this.state.description,
          hours: this.state.hours,
          status: this.props.status,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service update was successful");
        this.state.setServiceUpdate(true);
        console.log(response)
        
     
        
      } else {
        console.log("Service update failed");
      }
      return response.json();
      
    });
 
  };

  checkForProfile=() => {
    if (this.state.serviceUpdate){
      return <Redirect to="/mydashboard"/>
    }
  }

  componentDidMount(){
    this.props.setBackArrowToggle(true) 
    this.props.setIsAdminFalse(false);
    this.fetchServiceRequests()
    console.log(this.props.serviceRequests)
    console.log(this.props.indexNumber)
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
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
          style={{ paddingLeft: "40px", paddingRight: "40px", marginTop:"100px" }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <div  style={{ marginTop: "25px" }}>
          <Typography component="h1" variant="h4" className="signupTitle">
              Edit Service Entry
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
                        this.state.setDate(e.target.value);
                        console.log(this.state.date);
                        console.log(e.target.value);
                      }}
                      defaultValue={this.props.specificEntry.date}
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
                        this.state.setTypeOfService(e.target.value);
                        console.log(this.state.entryById.typeOfService);
                        console.log(e.target.value);
                      }}
                      defaultValue={this.props.specificEntry.typeOfService}
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
                    console.log(e.target.value)
                    this.state.setDescription(e.target.value);
                    console.log(this.props.description);
                    console.log(this.props.specificEntry)
                    console.log(this.props.indexNumber)
                  }}
                  defaultValue={this.props.specificEntry.description}
                 
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
                        this.state.setHours(e.target.value);
                        console.log(this.props.hours);
                        console.log(e.target.value);
                      }}
                      defaultValue={this.props.specificEntry.hours}
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
                  //if less than one diabled 
                >
                  UPDATE
                </Button>
              {/* </Link> */}
              <Grid container justify="flex-end"></Grid>
            </form>
          </div>
        </Container>
        {console.log(this.props.serviceRequests)}
        {console.log(this.props.typeOfService)}
        {console.log(this.props.specificEntry)}
        
       
        {this.checkForProfile()}
      </div>
    );
    
  }
 
}

export default UpdateServiceHours;
