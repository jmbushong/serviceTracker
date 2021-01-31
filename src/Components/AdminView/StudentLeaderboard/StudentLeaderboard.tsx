import { Component, Fragment } from "react";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Hidden from "@material-ui/core/Hidden";
// import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
// import StudentProfile from "./StudentProfile";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentEntry from "./StudentEntry";
import API_URL from "../../../environment";

import { StudentUser, StudentUsers } from './types'




type SLBProps = {
  sessionToken: string;
};


type SLBState = {
  // specificUser: any;

  // userId: any;
  users: StudentUsers;
  rank: any;
  // userServices: any;
  // setUserServices: (e: any) => void;
  // setUser: (e: any) => void;
  // open: any;
};

class StudentLeaderboard extends Component<SLBProps, SLBState> {
  constructor(props: SLBProps) {
    super(props);
    this.state = {

      rank: 1,
      users: [],
      // userServices: [],
      // setUser: (e) => {
      //   this.setState({ users: e });
      // },
      // setUserServices: (e) => {
      //   this.setState({ userServices: e });
      // }
    };

    this.fetchUsers = this.fetchUsers.bind(this)

  }

  componentDidMount() {
    this.fetchUsers();
    // this.arrLength();
  }









  // runTotalHours =(userObj:any) =>{
  //   this.handleTotalHours(userObj)
  // }

  // percentage = (e: any) => {

  //   e.services?.length > 0
  //     ? e?.services.map((service: any, index: any) =>
  //         arr.push(
  //           e?.services[index].status === "Approved"
  //             ? e?.services[index].hours
  //             : 0
  //         )
  //       )
  //     : console.log("did not work");


  //   e?.services.length > 0 ? (sum = arr.reduce(add)) : (sum = 0);

  //   this.handleTotalHours(e.id);

  // };


  fetchUsers() {
    fetch(`${API_URL}/user/allbyhours`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json: StudentUsers) => {

        this.setState({ users: json.sort((a, b) => b.totalHours - a.totalHours) }); //taking information from the server and setting it to our state


      });
  };



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
              {
                this.state.users.length > 0
                  ? this.state.users.map((user: StudentUser, index: number) =>
                    <StudentEntry user={user} index={index} sessionToken={this.props.sessionToken}
                      fetchUsers={this.fetchUsers} />)
                  : null
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default StudentLeaderboard;
