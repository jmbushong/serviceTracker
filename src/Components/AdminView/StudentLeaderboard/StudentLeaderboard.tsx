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
import Typography from "@material-ui/core/Typography";

import StudentEntry from "./StudentEntry";
import API_URL from "../../../environment";

import { StudentUser, StudentUsers, Service } from './types'


type SLBProps = {
  sessionToken: string;
};


type SLBState = {
  users: StudentUsers;
};

class StudentLeaderboard extends Component<SLBProps, SLBState> {
  constructor(props: SLBProps) {
    super(props);
    this.state = {
      users: [],
    };

    this.fetchUsers = this.fetchUsers.bind(this)
  }

  componentDidMount() {
    this.fetchUsers();
  }


  async fetchUsers() {
    const result = await fetch(`${API_URL}/user/all`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })

    const json = await result.json()
    
    this.setState({ users: json.sort(this.sortStudents) });
  };

  sortStudents (a: StudentUser, b: StudentUser) {
    const calcTotal = (x: StudentUser) => x.services
      .map((s: Service) => s.status === 'Approved' ? s.hours : 0)
      .reduce((a, h) => a + h, 0)
    return calcTotal(b) - calcTotal(a)
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
                style={{ background: "white", padding: "0px" }} />
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
