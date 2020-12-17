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

const percentage = 66;


type AcceptedProps = {

  sessionToken?: any;
  backArrowToggle: any;
  arrowHandler: any;
  clearToken: any;
};
class AdminDash extends React.Component <AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }
  checkForToken = () => {
    if (!this.props.sessionToken) {
      return <Redirect to="/login" />;
    }
    return <Redirect to="/admindash" />;
  };

  componentDidMount() {
 
    this.checkForToken()
      this.props.arrowHandler();
    }
  

  render() {
    return (
      <div  >
        <AdminSitebar
         backArrowToggle={this.props.backArrowToggle}
         arrowHandler={this.props.arrowHandler}
         clearToken={this.props.clearToken}
         sessionToken={this.props.sessionToken}
       
        />
        <Box className="admindash" >
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
              {/* <h4>Class PIN</h4> */}
              {/* <h1 >153754</h1> */}
              
            </div>
          </Box>
     
       
        </Box>
      
      </div>
    );
  }
}

export default AdminDash;
