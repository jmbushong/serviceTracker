import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API_URL from "../../environment";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import StudentProfile from "../AdminView/StudentProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AcceptedProps = {
  sessionToken: string;
};

let arr: any = [0];
let sum: number = 0;
const add = (a: number, b: number) => a + b;

type myState = {
  specificUser: any;

  userId: any;
  user: any;
  rank: any;
  userServices: any;
  setUserServices: (e: any) => void;
  setUser: (e: any) => void;
  setOpen: (e: any) => void;
  open: any;
};
class StudentLeaderboard extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      specificUser: [],
      userId: "",
      open: false,
      setOpen: (entry) => {
        this.setState({ open: entry });
      },
      rank: 1,
      user: [],
      userServices: [],
      setUser: (e) => {
        this.setState({ user: e });
      },
      setUserServices: (e) => {
        this.setState({ userServices: e });
      },
    };
    this.fetchUsers= this.fetchUsers.bind(this)
  }
  arrLength = () => {
    arr.length = 0;
  };

  handleClickOpen = (userObj: any) => {
    this.state.setOpen(true);
    this.setState({ specificUser: userObj });
  };

  percentage = (e: any) => {
    {
      this.arrLength();
    }
    {
      console.log(e?.services);
      e.services?.length > 0
        ? e?.services.map((service: any, index: any) =>
            arr.push(
              e?.services[index].status === "Approved"
                ? e?.services[index].hours
                : 0
            )
          )
        : console.log("did not work");
    }
    {
      e?.services.length > 0 ? (sum = arr.reduce(add)) : (sum = 0);
    }
    {
      console.log(sum);
    }
    {
      this.handleTotalHours(e.id);
    }
  };

  handleTotalHours = (id: any) => {
    // id.preventDefault();

    fetch(`${API_URL}/user/totalHours/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        studentUser: {
          totalHours: sum,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  fetchUsers = () => {
    fetch(`${API_URL}/user/allbyhours`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
    .then((res) => res.json())
    .then((json) => {
      
      console.log("fetchUsers Function")
console.log(json)
        this.setState({ user: json }); //taking information from the server and setting it to our state

     
      });
  };

  componentDidMount() {
    this.fetchUsers();
    this.arrLength();
    // console.log(this.state.user);
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
        <TableContainer style={{ marginTop: "5px" }} component={Paper}>
          <Box
            style={{
              background: "white",
              color: "white",
              padding: "10px",
            }}
          >
            <Box>
              <Box
                className="studentChart"
                style={{ background: "white", padding: "0px" }}
              >
                {/* <TextField
                  style={{ marginLeft: "20px", width: "200px" }}
                  label="Search by Name"
                  margin="normal"
                  variant="outlined"
                >
                  {" "}
                </TextField> */}
              </Box>
            </Box>
          </Box>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ marginLeft: "10px" }}>
                <TableCell align="center">Rank</TableCell>

                <TableCell>Name</TableCell>
                <TableCell align="center">Total Hours</TableCell>
                <TableCell align="center">Service Details</TableCell>
                <Hidden xsDown>
                  {" "}
                  <TableCell></TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.user.length > 0 ? (
                this.state.user.map((user: any, index: any) => (
                  <React.Fragment key={index}>
                    <TableRow style={{ height: "45px", marginRight: "3px" }}>
                      <TableCell align="center">{index + 1} </TableCell>

                      <TableCell align="left">
                        {user.firstName} {user.lastName}{" "}
                        {this.handleTotalHours(user.id)} 
                        {/* {console.log(user)} */}
                      </TableCell>

                      <TableCell align="center">
                        {" "}
                        {this.percentage(user)} {user.totalHours}{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button
                          variant="contained"
                          onClick={() => {
                            this.handleClickOpen(user);
                          }}
                        >
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              fontSize: "20px",
                            }}
                            icon={faListAlt}
                          />{" "}
                        </Button>{" "}
                      </TableCell>

                      {this.state.open ? (
                        <StudentProfile
                          fetchUsers={this.fetchUsers}
                          specificUser={this.state.specificUser}
                          open={this.state.open}
                          setOpen={this.state.setOpen}
                          user={this.state.user}
                          sessionToken={this.props.sessionToken}
                        />
                      ) : (
                        <div></div>
                      )}
                    </TableRow>

                    {/* {console.log(user)} */}
                  </React.Fragment>
                ))
              ) : (
                <div></div>
              )}
            </TableBody>
          </Table>

          {this.arrLength()}
          {/* {console.log(sum)} */}
        </TableContainer>
      </>
    );
  }
}

export default StudentLeaderboard;
