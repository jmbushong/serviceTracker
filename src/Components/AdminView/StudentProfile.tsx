import React, { Component } from "react";
import API_URL from "../../environment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";



type AcceptedProps = {
  // specificUser: studentUser[];
  specificUser: any;
  sessionToken: string;
  setOpen: (e: any) => void;
  open: boolean;
  user: any;
  fetchUsers: any;
  // runTotalHours:any;
  handleTotalHours:any;
  arrLength:any;
  percentage:any;
};

type myState = {

  currentStatus: string;
};

type studentUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

class StudentProfile extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      currentStatus: ""
 
   
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.percentage(this.props.specificUser)

  }

  handleClickClose = () => {
    this.props.fetchUsers();
    this.props.setOpen(false);
    
   
  };

  handleSubmitAsync = async (id: any, newStatus: any, userStatus?: any) => {
    try {
      const response = await fetch(`${API_URL}/service/status/${id}`, {
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
      // console.log(json);
      this.props.fetchUsers();
      console.log("handletotalhours")
      this.props.handleTotalHours(id);
      
      this.props.arrLength();
      
     
      // console.log(this.props.specificUser);
      // this.handleClickClose();

    } catch (err) {
      console.log(err);
    }
  };


  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle id="form-dialog-title">
          <Typography
            className="adminTitle"
            component="h2"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            {this.props.specificUser.firstName}{" "}
            {this.props.specificUser.lastName}
          </Typography>
        </DialogTitle>
        <form noValidate>
          <DialogContent style={{ padding: " 0px 15px" }}>
            <TableContainer style={{ marginTop: "15px" }}>
              <Table style={{ width: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date </TableCell>
                    <TableCell>Description</TableCell>

                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.specificUser.services.length > 0 ? (
                    this.props.specificUser.services.map(
                      (user: any, index: any) => (
                        <React.Fragment>
                          <TableRow>
                            <TableCell
                              style={{ width: "200px", fontSize: "11px" }}
                            >
                              {user.hours} hour(s) on {user.date} <br></br>
                            </TableCell>
                            <TableCell style={{ width: "200px" }}>
                              {user.description}
                            </TableCell>
                            <TableCell>
                              <Button>
                                {
                                  user.status === "Approved" ? (
                                    <FontAwesomeIcon
                                      onClick={() => {
                                       user.status= "Denied"

                                        this.handleSubmitAsync(
                                          user.id,
                                          "Denied",
                                          user.status
                                        );
                                      }}
                                      style={{
                                        color: "#06d6a0",
                                        fontSize: "20px",
                                      }}
                                      icon={faCheckSquare}
                                    />
                                  ) : user.status === "Denied" ? (
                                    <FontAwesomeIcon
                                      onClick={() => {
                                        user.status= "Approved"
                                        this.handleSubmitAsync(
                                          user.id,
                                          "Approved",
                                          user.status
                                        );
                                        this.setState({
                                          currentStatus: "Approved",
                                        });
                                      }}
                                      style={{ color: "#ef476f", fontSize: "20px" }}
                                      icon={faTimesCircle}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      onClick={() => {
                                        user.status= "Approved"
                                        this.handleSubmitAsync(
                                          user.id,
                                          "Approved",
                                          user.status
                                        );
                                        this.setState({
                                          currentStatus: "Approved",
                                        });
                                      }}
                                      style={{
                                        color: "#ffd166",
                                   
                                        fontSize: "20px",
                                      }}
                                      icon={faQuestionCircle}
                                    />
                                  
                                ) }

                          
                              </Button>
                            </TableCell>
                          </TableRow>
                          {/* {console.log(user)} */}
                        </React.Fragment>
                      )
                    )
                  ) : (
                    <div></div>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.fetchUsers();
                this.props.setOpen(false);
                // console.log(this.props.open);
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default StudentProfile;
