import React from 'react'

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";

import API_URL from '../../../environment'
import { Service } from './types'

interface ServiceEntryProps {
  service: Service;
  sessionToken: string;
  // fetchUsers: () => void;
}



export default class ServiceEntry extends React.Component<ServiceEntryProps, Service> {
  constructor (props: ServiceEntryProps) {
    super(props)
    this.state = this.props.service
  }


  async handleSubmit (newStatus: string) {
    console.log('handling service status submit')
    try {
      const response = await fetch(`${API_URL}/service/status/${this.props.service.id}`, {
        method: "PUT",
        body: JSON.stringify({
          service: {
            status: newStatus,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      });
      const json = await response.json();
      
      // this.props.fetchUsers();
      // this.props.handleTotalHours();

    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
      <>
        <TableRow>
          <TableCell
            style={{ width: "200px", fontSize: "11px" }}
          >
            {this.props.service.hours} hour(s) on {this.props.service.date} <br></br>
          </TableCell>
          <TableCell style={{ width: "200px" }}>
            {this.props.service.description}
          </TableCell>
          <TableCell>
            <Button>
              {
                this.state.status === "Approved" ? (
                  <FontAwesomeIcon
                    onClick={() => {
                      this.setState({status: "Denied"})
                      this.handleSubmit("Denied")
                    }}
                    style={{
                      color: "#06d6a0",
                      fontSize: "20px",
                    }}
                    icon={faCheckSquare}
                  />
                ) : this.state.status === "Denied" ? (
                  <FontAwesomeIcon
                    onClick={() => {
                      this.setState({status: 'Approved'})
                      this.handleSubmit("Approved")
                    }}
                    style={{ color: "#ef476f", fontSize: "20px" }}
                    icon={faTimesCircle}
                  />
                ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          this.setState({status: "Approved"})
                          this.handleSubmit("Approved")
                        }}
                        style={{
                          color: "#ffd166",

                          fontSize: "20px",
                        }}
                        icon={faQuestionCircle}
                      />

                    )}


            </Button>
          </TableCell>
        </TableRow>
      </>
    )
  }
}