import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Box from "@material-ui/core/Box";
import Sitebar from "../../Sitebar/Sitebar"
import Chart from "../../StudentView/StudentDashboard/StudentViewDashboard/Chart"

const percentage = 66;

class MyDashboard extends React.Component {
  render() {
    return (
        <Box className="studentDash">

            <Sitebar />
            <h4 style={{textAlign:"center", marginTop:"30px"}}>Amy Baker's Dashboard</h4>
      <Box  className="progressCircle">
        <CircularProgressbar value={percentage} text={`20/30`} />
      </Box>
      <Box className= "studentChart">
      <Chart />
      </Box>
      </Box>
    );
  }
}

export default MyDashboard;
