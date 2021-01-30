import React, { Component } from "react";
import API_URL from "../../environment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

import AddBoxIcon from "@material-ui/icons/AddBox";

type AcceptedProps = {
  specificUser: any;
  sessionToken: any;
  setOpen: (e: any) => void;
  open: any;
  user: any;
  fetchUsers:any;
};

type myState = {
  update: boolean;
  setUpdate: (e: any) => void;
  green: boolean;
  red: boolean;
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
      green: false,
      red: false,
      update: false,
      setUpdate: (e) => {
        this.setState({ update: e });
      },
    };
  }

 
  
  componentDidMount() {
    
    this.props.fetchUsers();
 
  }



  //   handleClickClose = () => {
  //     this.props.setOpen(false);
  //   };

  handleSubmit= (id: any, newStatus: any) => {
    // id.preventDefault();

    fetch(`${API_URL}/service/status/${id}`, {
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
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
        this.props.fetchUsers()
        if (this.props.user.status === "Approve") {
          this.setState({red: false})
          this.setState({green:true})
        } else if( this.props.user.status === "Denied"){
          this.setState({red: true})
          this.setState({green:false})
        } else{
          this.setState({red: true})
          this.setState({green:false})
        }
        
        
        
    
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
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
                            <TableCell style={{ width: "200px", fontSize:"11px" }}>
                            {user.hours} hour(s) on {user.date} <br></br>  
                            </TableCell>
                            <TableCell style={{ width: "200px" }}>
                              {user.description}
                            </TableCell>
                            <TableCell>
                              <Button>
                                {user.status === "Approved"  ? (
                                  <FontAwesomeIcon 
                                  onClick={() => {
                                    this.handleSubmit(
                                     user.id, "Denied"
                                    );

                                  
                                  }}
                                    style={{ color: "green", fontSize: "20px" }}
                                    icon={faCheckSquare}
                                  />
                                ) : user.status === "Denied"   ? (
                                  <FontAwesomeIcon
                                  onClick={() => {
                                    this.handleSubmit(
                                      user.id, "Approved"
                                    );
                                

                                  }}
                                    style={{ color: "red", fontSize: "20px" }}
                                    icon={faTimesCircle}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                  onClick={() => {
                                    this.handleSubmit(
                                      user.id, "Approved"
                                    );
                                  }}
                                    style={{
                                      color: "orange",
                                      fontSize: "20px",
                                    }}
                                    icon={faQuestionCircle}
                                  />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {console.log(user)}
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
                this.props.setOpen(false);
                console.log(this.props.open);
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </form>
        {console.log(this.props.specificUser)}
      </Dialog>
    );
  }
}

export default StudentProfile;
