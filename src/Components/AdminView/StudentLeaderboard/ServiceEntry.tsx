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


type Statuses = 'Approved' | 'Denied' | 'Pending'

interface ServiceEntryProps {
  service: Service;
  sessionToken: string;
}



export default class ServiceEntry extends React.Component<ServiceEntryProps, Service> {
  constructor (props: ServiceEntryProps) {
    super(props)
    this.state = this.props.service
  }

  toggleServiceStatus () {
    if (['Denied', 'Pending'].includes(this.state.status)) {
      this.setState({ status: 'Approved'})
      this.handleSubmit('Approved')
    } else {
      this.setState({ status: 'Denied'})
      this.handleSubmit('Denied')
    }
  }

  handleSubmit (newStatus: string) {
    try {
      fetch(`${API_URL}/service/status/${this.state.id}`, {
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

    } catch (err) {
      console.log(err);
    }
  };

  getStyle () {
    return {
      Approved: {
        icon: faCheckSquare,
        color: '#06d6a0'
      },
      Denied: {
        icon: faTimesCircle,
        color: '#ef476f'
      },
      Pending: {
        icon: faQuestionCircle,
        color: '#ffd166'
      }
    }[this.state.status as Statuses]
  }

  render() {
    return (
      <>
        <TableRow>
          <TableCell
            style={{ width: "200px", fontSize: "11px" }}
          >
            {this.state.hours} hour(s) on {this.state.date} <br></br>
          </TableCell>
          <TableCell style={{ width: "200px" }}>
            {this.state.description}
          </TableCell>
          <TableCell>
            <Button>

              <FontAwesomeIcon
                onClick={() => {
                  this.toggleServiceStatus()
                }}
                style={{
                  color: this.getStyle().color,
                  fontSize: '20px'
                }}
                icon={this.getStyle().icon} />

            </Button>
          </TableCell>
        </TableRow>
      </>
    )
  }
}