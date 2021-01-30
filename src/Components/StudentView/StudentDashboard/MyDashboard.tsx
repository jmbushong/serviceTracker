import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Box from "@material-ui/core/Box";
import Sitebar from "../../Sitebar/Sitebar";
import Chart from "../../StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ViewEvents from "../ViewEvents";
import API_URL from "../../../environment";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from "@material-ui/core/Hidden";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

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
let arr2: any = [0];
let arr3: any = [0];
let sum: number = 0;
let sum2: number = 0;
let sum3: number = 0;
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

  percentageUnderReview = () => {
    {
      this.arr3Length();
    }
    {
      this.props.serviceRequests.length > 0
        ? this.props.serviceRequests?.map((service: any, index: any) =>
            arr3.push(
              this.props.serviceRequests[index].status === "Pending"
                ? this.props.serviceRequests[index].hours
                : 0
            )
          )
        : console.log("did not work");
    }
    {
      this.props.serviceRequests.length > 0
        ? (sum3 = arr3.reduce(add))
        : (sum3 = 0);
    }
  };

  percentageDenied = () => {
    {
      this.arr2Length();
    }
    {
      this.props.serviceRequests.length > 0
        ? this.props.serviceRequests?.map((service: any, index: any) =>
            arr2.push(
              this.props.serviceRequests[index].status === "Denied"
                ? this.props.serviceRequests[index].hours
                : 0
            )
          )
        : console.log("did not work");
    }
    {
      this.props.serviceRequests.length > 0
        ? (sum2 = arr2.reduce(add))
        : (sum2 = 0);
    }
  };

  percentage = () => {
    {
      this.arrLength();
    }
    {
      this.props.serviceRequests.length > 0
        ? this.props.serviceRequests?.map((service: any, index: any) =>
            arr.push(
              this.props.serviceRequests[index].status === "Approved"
                ? this.props.serviceRequests[index].hours
                : 0
            )
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
    fetch(`${API_URL}/service`, {
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

  arr2Length = () => {
    arr2.length = 0;
  };

  arr3Length = () => {
    arr3.length = 0;
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
        <Grid container className="studentContainer" component="main">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              className="signupTitle marginStudentDash"
              component="h2"
              variant="h5"
            >
              Student Dashboard
            </Typography>
          </Grid>

          {/* <Grid item xs={false} sm={false} md={1} lg={1}>   </Grid> */}

          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className="blueDiv">
              <Box className="progressCircle">
                <CircularProgressbar
                  styles={{
                    path: { stroke: "#06d6a0" },
                    text: { fill: "black" },
                  }}
                  value={(sum / 30) * 100}
                  text={`${sum}/30` }
                
                />
                <Grid container component="main">
                
                  
                  </Grid>
                  <Hidden xsDown>  <Card style={{marginTop:"20px", backgroundColor: "#fafafa"}}>
      <CardContent>
    
    
        <Typography color="textSecondary" variant="body2" component="p">
         Current Totals
          <br/><br/>
         {sum}  Approved 
          <br/>
         {sum2}  Denied 
          <br/>
          
          {sum3}  Pending 
          <br/>
         
        </Typography>
      </CardContent>
  
    </Card></Hidden>
                
             
              </Box>
            </div>
          </Grid>

          <Grid
            style={{ backgroundColor: "#fafafa" }}
            item
            xs={12}
            sm={6}
            md={6}
            lg={7}
          >
            <Box className="studentDash">
          
              <Box className="studentChart">
                <ViewEvents
                  setBackArrowToggle={this.props.setBackArrowToggle}
                  setIsAdminFalse={this.props.setIsAdminFalse}
                  isAdmin={this.props.isAdmin}
                  backArrowToggle={this.props.backArrowToggle}
                  // arrowHandler={this.arrowHandler}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
                />
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
  
        {this.checkForToken()}
        {this.percentage()}
        {this.arrLength()}
        {this.percentageDenied()}
        {this.percentageUnderReview()}
        {this.arr2Length()}
        {this.arr3Length()}
      </React.Fragment>
    );
  }
}

export default MyDashboard;
