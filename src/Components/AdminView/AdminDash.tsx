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

class AdminDash extends React.Component {
  render() {
    return (
      <div>
        <Sitebar />
        <Box className="admindash">
          <Box className="admindash_div">
            <h2 style={{  marginBottom: "35px" }}>
              Admin Dashboard
            </h2>

            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faTrophy} />
              Leaderboard
            </h3>

            <h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon className="admindash_icons" icon={faClock} />
              Manage Hours
            </h3>
            <Link to="/adminevent"><h3 className="marginBottom">
              {" "}
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faCalendarAlt}
              />
              Schedule Event
            </h3></Link>
            <h3 className="marginBottom">
              <FontAwesomeIcon
                className="admindash_icons"
                icon={faAddressBook}
              />
              Student Accounts
            </h3>
           
          </Box>
          <div className="classCode">
              {" "}
              <h4>Class PIN</h4>
              <h1 >153754</h1>
              
            </div>
        </Box>
      </div>
    );
  }
}

export default AdminDash;
