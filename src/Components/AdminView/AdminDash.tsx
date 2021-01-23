import React, { Component } from "react";

import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import AdminSitebar from "../Sitebar/AdminSitebar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import ManageAccounts from "./ManageAccounts";
import Button from "@material-ui/core/Button";
import EventSchedule from "./Events/EventSchedule";
import ManageHours from "./ManageHoursTable";
import ManageHoursTable from "./ManageHours";

const percentage = 66;

type AcceptedProps = {
  sessionToken?: any;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  teacherAccount: any;
  isAdmin: any;
  setBackArrowToggle: any;
  setIsAdminTrue: (e: any) => void;
};

type myState = {
  classId: any;
  setClassId: (e: any) => void;
  viewStudentAccount: any;
  viewEventSchedule: any;
  viewManageHours: any;
};

class AdminDash extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      viewManageHours: false,
      viewEventSchedule: false,
      viewStudentAccount: false,
      classId: [],
      setClassId: (entry) => {
        this.setState({ classId: entry });
      },
    };
  }

  fetchTeacherData = () => {
    fetch(`http://localhost:4000/teacherUser`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.classId);
        this.state.setClassId(json.classId);
      });
  };

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

  componentDidMount() {
    this.fetchTeacherData();
    this.props.setBackArrowToggle(false);
    this.props.setIsAdminTrue(true);
    this.checkForToken();
    // this.props.arrowHandler();
    console.log(this.props.teacherAccount);
  }

  render() {
    return (
      <div>
        <AdminSitebar
          backArrowToggle={this.props.backArrowToggle}
          //  arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />
        <Grid container component="main">
          {/* <Grid item xs={3} sm={1} md={1} lg={1}>
            {" "}
          </Grid> */}

          <Grid style={{backgroundColor:"#2f2e41"}} item xs={2} sm={4} md={4} lg={3}>
            <Box className="admindash" >
              <Hidden xsDown>
              <Typography
                className="adminTitle"
                component="h2"
                variant="h5"
                style={{
                  marginBottom: "25px",
                  font: "Sofia, cursive !important",
                  color: "white"
            
                }}
              >
                Admin Dashboard
              </Typography>
              <hr />


              </Hidden>
              {/* <Typography
                className="adminTitle"
                component="h2"
                variant="h5"
                style={{
                  marginBottom: "25px",
                  font: "Sofia, cursive !important",
                  color: "white"
            
                }}
              >
                Admin Dashboard
              </Typography>
              <hr /> */}

              <Box className="admindash_card">
                <h3 className="marginBottom"
                     style={{ cursor: "pointer", color:"white" }}
                >

                  {" "}
                  <FontAwesomeIcon
                    className="admindash_icons"
                    icon={faTrophy}
           
                  />
                    <Hidden xsDown>Leaderboard</Hidden> 
                </h3>
              </Box>

              <h3
                className="marginBottom"
                style={{ cursor: "pointer", color:"white" }}
                onClick={() => {
                  this.setState({ viewStudentAccount: false });
                  this.setState({ viewEventSchedule: false });
                  this.setState({ viewManageHours: true });
                }}
              >
                {" "}
                <FontAwesomeIcon className="admindash_icons" icon={faClock} />
                <Hidden xsDown>Manage Hours</Hidden>  
              </h3>

              <h3
                className="marginBottom"
                style={{ cursor: "pointer", color:"white" }}
                onClick={() => {
                  this.setState({ viewStudentAccount: false });
                  this.setState({ viewEventSchedule: true });
                }}
              >
                {" "}
                <FontAwesomeIcon
                  className="admindash_icons"
                  icon={faCalendarAlt}
                />
                  <Hidden xsDown>Schedule Event</Hidden>  
              </h3>

              <h3
                className="marginBottom"
                style={{ cursor: "pointer", color:"white" }}
                onClick={() => {
                  this.setState({ viewStudentAccount: true });
                }}
           
              >
                <FontAwesomeIcon
                  className="admindash_icons"
                  icon={faAddressBook}
                />
                   <Hidden xsDown>Student Accounts</Hidden>  
              </h3>
              {/* <div className="classCode">
              {" "}
              <h4>Class PIN</h4>
           <h1> {this.state.classId}</h1>
              
            </div>
   */}
            </Box>
          </Grid>

          <Grid item xs={10} sm={8} md={8} lg={8}>
            {this.state.viewStudentAccount ? (
              <ManageAccounts
                setIsAdminTrue={this.props.setIsAdminTrue}
                teacherAccount={this.props.teacherAccount}
                backArrowToggle={this.props.backArrowToggle}
                // arrowHandler={this.arrowHandler}
                clearToken={this.props.clearToken}
                sessionToken={this.props.sessionToken}
                setBackArrowToggle={this.props.setBackArrowToggle}
              ></ManageAccounts>
            ) : this.state.viewEventSchedule ? (
              <EventSchedule
                setIsAdminTrue={this.props.setIsAdminTrue}
                backArrowToggle={this.props.backArrowToggle}
                // arrowHandler={this.arrowHandler}
                clearToken={this.props.clearToken}
                sessionToken={this.props.sessionToken}
                setBackArrowToggle={this.props.setBackArrowToggle}
              ></EventSchedule>
            ) : this.state.viewManageHours ? (
              <ManageHoursTable
                teacherAccount={this.props.teacherAccount}
                setIsAdminTrue={this.props.setIsAdminTrue}
                backArrowToggle={this.props.backArrowToggle}
                clearToken={this.props.clearToken}
                sessionToken={this.props.sessionToken}
                setBackArrowToggle={this.props.setBackArrowToggle}
              ></ManageHoursTable>
            ) : (
              <Hidden xsDown>
                <div id="burst">
                  <h1
                    className="adminTitle"
                    style={{
                      color: "black",
                      position: "absolute",
                      top: "80px",
                      left: "75px",
                    }}
                  >
                    Class Code
                  </h1>{" "}
                  <br></br>
                  <h1
                    style={{
                      color: "black",
                      position: "absolute",
                      top: "130px",
                      left: "80px",
                      fontSize: "55px",
                      letterSpacing: "4px",
                    }}
                  >
                    {" "}
                    {this.state.classId}
                  </h1>
                </div>
              </Hidden>
            )}

            {/* <Hidden xsDown><div id="burst" >
<h1   className="adminTitle" style={{color:"black", position:"absolute", top: "80px", left: "75px"}}>Class Code</h1> <br></br>
<h1 style={{color:"black", position:"absolute", top: "130px", left: "80px", fontSize: "55px", letterSpacing:"4px"}}> {this.state.classId}</h1>


</div></Hidden> */}
          </Grid>
        </Grid>

        {/* <Grid container  component="main" >
        <Grid item xs={12} sm={6} md={6} lg={5} >   
        <Box className="admindash" style={{position:"relative"}} >
      
          <Typography
            className="adminTitle"
            component="h1"
            variant="h4"
            style={{marginBottom: "25px",  font: "Sofia, cursive !important"}}
          >
            Admin Dashboard
          </Typography> 
            <hr/>
       
          
            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faTrophy} />
              Leaderboard
            </h3>
     
            <Link className="visited" to="/managehours">  <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faClock} />
              Manage Hours
            </h3></Link>
          
            <Link className="visited" to="/adminevent"><h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faCalendarAlt}
              />
              Schedule Event
            </h3></Link>
            <Link className="visited" to="/manageaccounts"><h3 className="marginBottom">
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faAddressBook}
              />
              Student Accounts
            </h3></Link>
            <div className="classCode">
              {" "}
              <h4>Class PIN</h4>
           <h1> {this.state.classId}</h1>
              
            </div>
        
     
       
        </Box>
       
          
          
  
             </Grid></Grid>
       */}
      </div>
    );
  }
}

export default AdminDash;
