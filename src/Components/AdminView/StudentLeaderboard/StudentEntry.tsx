import { Component, Fragment } from 'react'

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";

import API_URL from "../../../environment";
import StudentProfile from './StudentProfile'

import { StudentUser, Service } from './types'

interface StudentEntryProps {
  index: number;
  user: StudentUser;
  fetchUsers: () => void;
  sessionToken: string;
}

interface StudentEntryState {
  open: boolean;
}



export default class StudentEntry extends Component<StudentEntryProps, StudentEntryState> {
  constructor (props: StudentEntryProps) {
    super(props)
    this.state = {
      open: false
    }
    this.toggleOpen = this.toggleOpen.bind(this)
    this.handleTotalHours = this.handleTotalHours.bind(this)
  }

  toggleOpen () {
    this.props.fetchUsers();
    this.setState({ open: !this.state.open });
  }


  calcTotalHours () {
    return this.props.user.services
             .filter((s: Service) => s.status === 'Approved')
             .reduce((a: number, s: Service) => a + s.hours, 0)
  }

  handleTotalHours () {
    // id.preventDefault();

    fetch(`${API_URL}/user/totalHours/${this.props.user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        studentUser: {
          totalHours: this.calcTotalHours(),
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
      // return response.json();
    });
  };


  render() {
    return (
      <Fragment key={this.props.index}>
        <TableRow style={{ height: "45px", marginRight: "3px" }}>
          <TableCell align="center">{this.props.index + 1} </TableCell>

          <TableCell align="left">
            {this.props.user.firstName} {this.props.user.lastName}{" "}
            {this.handleTotalHours()}

            {/* {console.log(user)} */}
          </TableCell>

          <TableCell align="center">
            {" "}
            {/* {this.percentage(this.props.user)} */} {this.props.user.totalHours}{" "}

          </TableCell>
          <TableCell align="center">
            {" "}
            <Button variant="contained" onClick={() => { this.toggleOpen(); }}>
              {" "}
              <FontAwesomeIcon
                style={{
                  fontSize: "20px",
                }}
                icon={faListAlt}
              />{" "}
            </Button>{" "}
          </TableCell>

          {
            this.state.open
            ? <StudentProfile
                //arrLength={this.arrLength}
                handleTotalHours={this.handleTotalHours}
                //runTotalHours={this.runTotalHours}
                fetchUsers={this.props.fetchUsers}
                // specificUser={this.state.specificUser}
                open={this.state.open}
                toggleOpen={this.toggleOpen}
                user={this.props.user}
                sessionToken={this.props.sessionToken}
              />
            : null
          }
        </TableRow>

        {/* {console.log(user)} */}
      </Fragment>
    )
  }
}