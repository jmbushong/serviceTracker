import { Component, Fragment } from 'react'

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";


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
  }

  toggleOpen () {
    this.props.fetchUsers();
    this.setState({ open: !this.state.open });
  }

  computeTotalHours () {
    return this.props.user.services
      .map((s: Service) => s.status === 'Approved' ? s.hours : 0)
      .reduce((a: number, h: number) => a + h, 0)
  }

  render() {
    return (
      <Fragment key={this.props.index}>
        <TableRow style={{ height: "45px", marginRight: "3px" }}>
          <TableCell align="center">{this.props.index + 1} </TableCell>

          <TableCell align="left">
            {this.props.user.firstName} {this.props.user.lastName}{" "}
          </TableCell>

          <TableCell align="center">
            {" "}
            {/* {this.percentage(this.props.user)} */} {this.computeTotalHours()}{" "}

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
                open={this.state.open}
                toggleOpen={this.toggleOpen}
                user={this.props.user}
                sessionToken={this.props.sessionToken}
                fetchUsers={this.props.fetchUsers}
              />
            : null
          }
        </TableRow>

        {/* {console.log(user)} */}
      </Fragment>
    )
  }
}