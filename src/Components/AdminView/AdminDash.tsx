import React, { Component } from "react";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSearch} from "@fortawesome/free-solid-svg-icons";
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

import ManageHoursTable from "./ManageHours";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import clipboard from "../../Assets/undraw_No_data_re_kwbl.svg"
import API_URL from "../../environment";
import StudentLeaderboard from "../AdminView/StudentLeaderboard"


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
  viewSearch: any;
  setViewManageHours: (e: any) => void;
  setViewSearch: (e: any) => void;
  setViewEventSchedule: (e: any) => void;
  setViewStudentAccount: (e: any) => void;
};

class AdminDash extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      viewManageHours: false,
      viewSearch: false,
      viewEventSchedule: false,
      viewStudentAccount: false,
      setViewSearch: (entry) => {
        this.setState({ viewSearch: entry });
      },
      setViewManageHours: (entry) => {
        this.setState({ viewManageHours: entry });
      },
      setViewEventSchedule: (entry) => {
        this.setState({ viewEventSchedule: entry });
      },
      setViewStudentAccount: (entry) => {
        this.setState({ viewStudentAccount: entry });
      },
      classId: [],
      setClassId: (entry) => {
        this.setState({ classId: entry });
      },
    };
  }

  fetchTeacherData = () => {
    fetch(`${API_URL}/teacherUser`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
   
        this.state.setClassId(json.classId);
      });
  };

  checkForToken = () => {

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
    
  }

  render() {
    return (
      <div>
        <AdminSitebar
          setViewManageHours={this.state.setViewManageHours}
          setViewStudentAccount={this.state.setViewStudentAccount}
          setViewEventSchedule={this.state.setViewEventSchedule}
          backArrowToggle={this.props.backArrowToggle}
          //  arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}

        />
        <Hidden smUp>
          <Paper
            square
            style={{ marginTop: "50px", backgroundColor: "#2f2e41" }}
          >
            <Tabs
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
           
              <Tab 
                 onClick={() => {
                  this.setState({ viewStudentAccount: false });
                  this.setState({ viewEventSchedule: false });
                  this.setState({ viewManageHours: false});
                  this.setState({ viewSearch: true });
                }}
              icon={      <FontAwesomeIcon
                       style={{ color: "white", fontSize: "20px" }}
                      icon={faSearch}
                    />} aria-label="phone" />
              <Tab
                    onClick={() => {
                      this.setState({ viewSearch:false });
                      this.setState({ viewStudentAccount: false });
                      this.setState({ viewEventSchedule: false });
                      this.setState({ viewManageHours: true });
                    }}
                icon={
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "20px" }}
                    icon={faClock}
              
                  />
                }
                aria-label="favorite"
              />
              <Tab
                   onClick={() => {
                    this.setState({ viewSearch:false });
                    this.setState({ viewManageHours: false });
                    this.setState({ viewStudentAccount: false });
                    this.setState({ viewEventSchedule: true });
                  }}
                icon={
                  <FontAwesomeIcon
                    style={{ color: "white", fontSize: "20px" }}
                    className="admindash_icons"
                    icon={faCalendarAlt}
               
                  />
                }
                aria-label="person"
              />
                 <Tab
                      onClick={() => {
                        this.setState({ viewSearch:false });
                        this.setState({ viewManageHours: false });
                        this.setState({ viewEventSchedule: false });
                        this.setState({ viewStudentAccount: true });
                      }}
                icon={
                  <FontAwesomeIcon
                  style={{ color: "white", fontSize: "20px" }}
                  icon={faAddressBook}
             
                />
                
                }
                aria-label="person"
              />
            </Tabs>
          </Paper>
        </Hidden>
        <Grid container component="main">
          <Hidden xsDown>
            <Grid
              style={{ backgroundColor: "#2f2e41" }}
              item
              xs={2}
              sm={1}
              md={2}
              lg={2}
            >
              <Box className="admindash">
                <Hidden smDown>
                  <Typography
                           onClick={() => {
                            this.setState({ viewSearch:false });
                            this.setState({ viewStudentAccount: false });
                            this.setState({ viewEventSchedule: false });
                            this.setState({ viewManageHours: false});
                          }}
                    className="adminTitle"
                    component="h2"
                    variant="h5"
                    style={{
                      marginLeft: "25px",
                      marginBottom: "25px",
                      font: "Sofia, cursive !important",
                      color: "white",
                    }}
                  >
                   
                  </Typography>
                  {/* <hr /> */}
                </Hidden>
      

                <Box className="admindash_card">
                  <h3
                           onClick={() => {
                            this.setState({ viewSearch:true });
                            this.setState({ viewStudentAccount: false });
                            this.setState({ viewEventSchedule: false });
                            this.setState({ viewManageHours: true });
                          }}
                    className="marginBottom"
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      className="admindash_icons"
                      icon={faSearch}
                    />
                    <Hidden smDown>Search</Hidden>
                  </h3>
                </Box>

                <h3
                  className="marginBottom"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() => {
                    this.setState({ viewSearch:false });
                    this.setState({ viewStudentAccount: false });
                    this.setState({ viewEventSchedule: false });
                    this.setState({ viewManageHours: true });
                  }}
                >
                  {" "}
                  <FontAwesomeIcon className="admindash_icons" icon={faClock} />
                  <Hidden smDown>Hours</Hidden>
                </h3>

                <h3
                  className="marginBottom"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() => {
                    this.setState({ viewSearch:false });
                    this.setState({ viewStudentAccount: false });
                    this.setState({ viewManageHours: false });
                    this.setState({ viewEventSchedule: true });
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className="admindash_icons"
                    icon={faCalendarAlt}
                  />
                  <Hidden smDown>Events</Hidden>
                </h3>

                <h3
                  className="marginBottom"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() => {
                    this.setState({ viewSearch:false });
                    this.setState({ viewManageHours: false });
                    this.setState({ viewEventSchedule: false });
                    this.setState({ viewStudentAccount: true });
                  }}
                >
                  <FontAwesomeIcon
                    className="admindash_icons"
                    icon={faAddressBook}
                    
                  />
                  <Hidden smDown>Accounts</Hidden>
                </h3>
     
              </Box>
            </Grid>
          </Hidden>

          {this.state.viewStudentAccount ? (
            <>
          <Hidden xsDown>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  {" "}
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <ManageAccounts
                  setIsAdminTrue={this.props.setIsAdminTrue}
                  teacherAccount={this.props.teacherAccount}
                  backArrowToggle={this.props.backArrowToggle}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
                  setBackArrowToggle={this.props.setBackArrowToggle}
                ></ManageAccounts>{" "}
              </Grid>{" "}
            </>
          ) : this.state.viewSearch ? (
            <>         <Hidden xsDown>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              {" "}
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={9} md={8} lg={8}>
            <StudentLeaderboard
           
            ></StudentLeaderboard>
          </Grid> </>

          ):  this.state.viewEventSchedule ? (
            <>
              <Hidden xsDown>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  {" "}
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={9} md={8} lg={8}>
                <EventSchedule
                  setIsAdminTrue={this.props.setIsAdminTrue}
                  backArrowToggle={this.props.backArrowToggle}
                  // arrowHandler={this.arrowHandler}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
                  setBackArrowToggle={this.props.setBackArrowToggle}
                ></EventSchedule>{" "}
              </Grid>
            </>
          ) : this.state.viewManageHours ? (
            <>
          
              <Grid item xs={12} sm={10} md={10} lg={9}>
                <ManageHoursTable
                  teacherAccount={this.props.teacherAccount}
                  setIsAdminTrue={this.props.setIsAdminTrue}
                  backArrowToggle={this.props.backArrowToggle}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
                  setBackArrowToggle={this.props.setBackArrowToggle}
                ></ManageHoursTable>{" "}
              </Grid>{" "}
            </>
          ) : (
            <Grid item xs={12} sm={8} md={9} lg={10} >
              <div className="clip" > <img className="clipPhoto" src={clipboard}></img>
              <div className="classCodeImage"> <h2 className="signupTitle" >Class Code </h2>    <h2 className="classCodeId classCodeNumber" >{this.state.classId}</h2> </div>
             </div>
             


            </Grid> 

          )}
        </Grid>

       
      </div>
    );
  }
}

export default AdminDash;
