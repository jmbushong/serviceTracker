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
import { Link } from "react-router-dom";


let percentage = 56;

type AcceptedProps = {
  indexNumber:any;
  firstName: string;
  lastName: string;
  sessionToken: any;
  key: any;
  backArrowToggle: any;
  arrowHandler: any;
  clearToken: any;
  isAdmin: any;
  setIsAdminFalse: any;
  serviceRequests:any;
  setServiceRequests: (e: any) => void;
  setIndexNumber:(e:any)=>void;
               

};

let arr:any= []
let sum:number=0;
const add= (a:number , b:number )=> a + b

class MyDashboard extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }



  checkForToken = () => {
    console.log(this.props.isAdmin)
    
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  };

 percentage=() =>{
  {this.props.serviceRequests.length > 0 ? this.props.serviceRequests.map((service: any, index: any) =>(
    
   arr.push(this.props.serviceRequests[index].hours)
  ))
 : console.log('did not work')}
 {this.props.serviceRequests.length > 0 ? sum = arr.reduce(add) : console.log('did not work')}
 
}

  componentDidMount() {
    console.log(this.props.firstName);
    this.props.setIsAdminFalse(false);
   
   
    this.checkForToken()
      this.props.arrowHandler();
    }
  

  render() {
    return (
      <React.Fragment>
        <Sitebar 
          backArrowToggle={this.props.backArrowToggle}
          arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Box className="studentDash">
          <h4 style={{ textAlign: "center", marginTop: "30px" }}>
            My Dashboard
          </h4>

          <Box className="progressCircle">
            <CircularProgressbar value={sum} text={`${sum}/30`} />
          </Box>
          <Box
            className="studentChart"
            style={{ background: "#F6D55C", padding: "0px" }}
          >
            <Box className="toRight">
              {" "}
              <ButtonGroup
                style={{ background: "#F6D55C" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                <Link to="/addservice">
                  <Button style={{ background: "#F6D55C" }}>
                    <AddBoxIcon />
                  </Button>
                </Link>
                <Link to="/events">
                  {" "}
                  <Button style={{ background: "#F6D55C", marginRight: "0px" }}>
                    <EventNoteIcon />
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Box>
          <Box className="studentChart">
            <Chart serviceRequests={this.props.serviceRequests}
               setServiceRequests={this.props.setServiceRequests}
               sessionToken={this.props.sessionToken}
               setIndexNumber={this.props.setIndexNumber}

               indexNumber={this.props.indexNumber}
               />
          </Box>
        </Box>
        {this.checkForToken()}
        { this.percentage()}
        {arr.length=0}
  
      </React.Fragment>
    );
  }
}

export default MyDashboard;
