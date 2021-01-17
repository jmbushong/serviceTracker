import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Box from "@material-ui/core/Box";
import Sitebar from "../../Sitebar/Sitebar";
import Chart from "../../StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ViewEvents from "../ViewEvents";
import { GridDataContainer } from "@material-ui/data-grid";


let percentage = 56;

type AcceptedProps = {
  indexNumber: any;
  firstName: string;
  lastName: string;
  sessionToken: any;
  key: any;
  backArrowToggle: any;
  arrowHandler?: any;
  setBackArrowToggle: (e: any) => void;
  clearToken: any;
  isAdmin: any;
  setIsAdminFalse: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  setIndexNumber: (e: any) => void;
  setSpecificEntry: (e: any) => void;
  specificEntry: any;
};

let arr: any = [0];
let sum: number = 0;
const add = (a: number, b: number) => a + b;

class MyDashboard extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }

  checkForToken = () => {
    console.log(this.props.isAdmin);

    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  };

  percentage = () => {
    {
      this.arrLength();
    }
    {
      this.props.serviceRequests.length > 0
        ? this.props.serviceRequests?.map((service: any, index: any) =>
            arr.push(this.props.serviceRequests[index].hours)
          )
        : console.log("did not work");
    }
    {
      this.props.serviceRequests.length > 0
        ? (sum = arr.reduce(add))
        : (sum = 0);
    }
  };

  fetchServiceRequests = () => {
    fetch("http://localhost:4000/service", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.setServiceRequests(json); //taking information from the server and setting it to our state
        console.log(this.props.serviceRequests);
      });
  };

  componentDidMount() {
    console.log(this.props.firstName);
    this.props.setBackArrowToggle(false);
    this.props.setIsAdminFalse(false);
    this.arrLength();
    this.fetchServiceRequests();
    this.percentage();
    this.checkForToken();
  }

  arrLength = () => {
    arr.length = 0;
  };

  render() {
    return (
      <React.Fragment>
        <Sitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Grid container className="studentContainer" component="main" >
        <Grid item xs={12} sm={12} md={12} lg={12} >   
        <Typography
            className="signupTitle"
            component="h1"
            variant="h4"
            style={{marginBottom: "25px"}}
          >
            Student Dashboard
          </Typography> 
       
          
          
  
             </Grid>
          
             {/* <Grid item xs={false} sm={false} md={1} lg={1}>   </Grid> */}

        
             <Grid item xs={12} sm={3} md={3} lg={3}>  
            
             <div className="blueDiv" >
 
             <Box className="progressCircle">
            <CircularProgressbar
              styles={{ path: { stroke: "#06d6a0" }, text: { fill: "white" } }}
              value={(sum / 30) * 100}
              text={`${sum}/30`}
            />
               <Grid container component="main" >
              
              
               </Grid>
   
          </Box>
   
         
          </div>
          
       
          </Grid>
         
        
       
          <Grid style={{backgroundColor:"#fafafa"}} item xs={12} sm={6} md={6} lg={7}> 
 
          <Box className="studentDash">
          
{/*          
          <Box
            className="studentChart"
            style={{ background: "white", padding: "0px" }}
          >
           
            
            <Box className="toRight">
              
              
              {" "}
              <ButtonGroup
                style={{ background: "white" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                
                <Link to="/addservice">
                  <Button style={{ color: "#ef476f" }}>
                    <AddBoxIcon />
                  </Button>
                </Link>
                <Link to="/events">
                  {" "}
                  <Button style={{ color: "#ef476f", marginRight: "0px" }}>
                    <EventNoteIcon />
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Box> */}
          <Box className="studentChart">
          <ViewEvents setBackArrowToggle={this.props.setBackArrowToggle}
               setIsAdminFalse={this.props.setIsAdminFalse}
               isAdmin={this.props.isAdmin}
                backArrowToggle={this.props.backArrowToggle}
                // arrowHandler={this.arrowHandler}
                clearToken={this.props.clearToken}
                sessionToken={this.props.sessionToken}/>
            <Chart
              serviceRequests={this.props.serviceRequests}
              setServiceRequests={this.props.setServiceRequests}
              sessionToken={this.props.sessionToken}
              setIndexNumber={this.props.setIndexNumber}
              indexNumber={this.props.indexNumber}
              specificEntry={this.props.specificEntry}
              setSpecificEntry={this.props.setSpecificEntry}
            />
            
          </Box>
        </Box>
           </Grid>
          
       
        </Grid>
        {/* <Box className="studentDash">
          <Typography
            className="signupTitle"
            style={{ marginTop: "30px" }}
            component="h1"
            variant="h4"
          >
            My Progress
          </Typography>

          <Box className="progressCircle">
            <CircularProgressbar
              styles={{ path: { stroke: "#06d6a0" }, text: { fill: "black" } }}
              value={(sum / 30) * 100}
              text={`${sum}/30`}
            />
          </Box>
          <Box
            className="studentChart"
            style={{ background: "#ffd166", padding: "0px" }}
          >
            <Box className="toRight">
              {" "}
              <ButtonGroup
                style={{ background: "#ffd166" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                <Link to="/addservice">
                  <Button style={{ background: "#ffd166" }}>
                    <AddBoxIcon />
                  </Button>
                </Link>
                <Link to="/events">
                  {" "}
                  <Button style={{ background: "#ffd166", marginRight: "0px" }}>
                    <EventNoteIcon />
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Box>
          <Box className="studentChart">
            <Chart
              serviceRequests={this.props.serviceRequests}
              setServiceRequests={this.props.setServiceRequests}
              sessionToken={this.props.sessionToken}
              setIndexNumber={this.props.setIndexNumber}
              indexNumber={this.props.indexNumber}
              specificEntry={this.props.specificEntry}
              setSpecificEntry={this.props.setSpecificEntry}
            />
          </Box>
        </Box> */}
        {this.checkForToken()}
        {this.percentage()}
        {this.arrLength()}
      </React.Fragment>
    );
  }
}

export default MyDashboard;
