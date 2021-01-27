import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import API_URL from "../../environment";
import Hidden from "@material-ui/core/Hidden";

type AcceptedProps = {

  sessionToken: any;

};

type myState = {
  user: any;
  setUser: (e: any) => void;
};
class StudentLeaderboard extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
  user: [],
      setUser: (e) => {
        this.setState({ user: e });
      },
    };
  }


  // percentage = () => {
  //   {
  //     this.arrLength();
  //   }
  //   {
  //     this.state.user.services.length > 0
  //       ? this.state.user.services?.map((service: any, index: any) =>
  //           arr.push(
  //             this.state.user[index].status === "Approved"
  //               ? this.state.userservice[index].hours
  //               : 0
  //           )
  //         )
  //       : console.log("did not work");
  //   }
  //   {
  //     this.props.serviceRequests.length > 0
  //       ? (sum = arr.reduce(add))
  //       : (sum = 0);
  //   }
  // };


  fetchUsers = () => {
    fetch(`${API_URL}/user/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.state.setUser(json); //taking information from the server and setting it to our state
        console.log(this.state.user);
      });
  };


  componentDidMount() {
    this.fetchUsers();
    console.log(this.state.user);
  }

  render() {
    return (
      <>
        <br></br>
        <Typography
          className="adminTitle marginClassTotals"
          component="h2"
          variant="h5"

        >
          Class Totals
        </Typography>
        <TableContainer
       
          style={{ marginTop: "5px" }}
          component={Paper}
        >
          <Box
            style={{
              background: "white",
              color: "white",
              padding: "10px",
              width: "100%",
            }}
          >
            <Box>
              <Box
                className="studentChart"
                style={{ background: "white", padding: "0px" }}
              >
                <TextField
                  style={{ marginLeft: "20px", width: "150px" }}
                  label="Search by Name"
                  margin="normal"
                  variant="outlined"
                >
                  {" "}
                </TextField>

                <TextField
                  style={{ marginLeft: "20px", width: "150px" }}
                  label="Search by Hours"
                  margin="normal"
                  variant="outlined"
                >
                  {" "}
                </TextField>
              </Box>
            </Box>
          </Box>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ marginLeft: "10px" }}>
                <TableCell align="center">Rank</TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Hours</TableCell>
                <Hidden xsDown>
                  {" "}
                  <TableCell>See More</TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              
            {this.state.user.length > 0 ? (
              this.state.user.map((user: any, index: any) => (
           

              <React.Fragment key={this.state.user.id}>
                <TableRow style={{ height: "45px", marginRight: "3px" }}>
                  <TableCell align="center">1</TableCell>

                  <TableCell align="left">{this.state.user[index].firstName} {" "}
                  {this.state.user[index].lastName}
                  </TableCell>

                  <TableCell align="left"> 20 </TableCell>
                  <Hidden xsDown>
                    {" "}
                    <TableCell>Click Here</TableCell>
                  </Hidden>
                </TableRow>
       
               
              </React.Fragment>  
              ))
            ) : (
              <div></div>
            )}

             
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default StudentLeaderboard;
