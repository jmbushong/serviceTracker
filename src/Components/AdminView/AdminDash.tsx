import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Sitebar from "../Sitebar/Sitebar";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import AdminSitebar from "../Sitebar/AdminSitebar"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const percentage = 66;


type AcceptedProps = {

  sessionToken?: any;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  teacherAccount: any;
  isAdmin: any;
  setBackArrowToggle:any;
  setIsAdminTrue: (e: any) => void;
  
};

type myState={
  classId: any;
  setClassId: (e: any) => void;
}

class AdminDash extends React.Component <AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      classId:[],
      setClassId: (entry) => {
        this.setState({classId: entry});
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
        console.log(json.classId)
        this.state.setClassId(json.classId); 
        
      });
  };

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

  componentDidMount() {
    this.fetchTeacherData()
    this.props.setBackArrowToggle(false); 
    this.props.setIsAdminTrue(true)
    this.checkForToken()
      // this.props.arrowHandler();
      console.log(this.props.teacherAccount)
    }
  

  render() {
    return (
      <div  >
        <AdminSitebar
         backArrowToggle={this.props.backArrowToggle}
        //  arrowHandler={this.props.arrowHandler}
         clearToken={this.props.clearToken}
         sessionToken={this.props.sessionToken}
       
        />

<Grid container  component="main" >
        <Grid item xs={12} sm={12} md={12} lg={12} >   
        <Box className="admindash" >
          <Box className="admindash_div">
          <Typography
            className="adminTitle"
            component="h1"
            variant="h4"
            style={{marginBottom: "25px",  font: "Sofia, cursive !important"}}
          >
            Admin Dashboard
          </Typography> 
            <hr/>
       
          <Box className= "admindash_card" >
            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faTrophy} />
              Leaderboard
            </h3>
            </Box>
            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faClock} />
              Manage Hours
            </h3>
            <Link className="visited" to="/adminevent"><h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faCalendarAlt}
              />
              Schedule Event
            </h3></Link>
            <Link to="/manageaccounts"><h3 className="marginBottom">
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
     
       
        </Box>
       
          
          
  
             </Grid></Grid>
        {/* <Box className="admindash" >
          <Box className="admindash_div">
            <h2 style={{letterSpacing: '3px'}} >
              ADMIN DASHBOARD
            </h2>
            <hr/>
       
          <Box className= "admindash_card" >
            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faTrophy} />
              Leaderboard
            </h3>
            </Box>
            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faClock} />
              Manage Hours
            </h3>
            <Link className="visited" to="/adminevent"><h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faCalendarAlt}
              />
              Schedule Event
            </h3></Link>
            <Link to="/manageaccounts"><h3 className="marginBottom">
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
     
       
        </Box> */}
      
      </div>
    );
  }
}

export default AdminDash;
