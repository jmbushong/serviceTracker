import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
  fetchTeacherData: any;
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  
  setFirstName: (e: any) => void;
  setLastName: (e: any) => void;
  setEmail: (e: any) => void;
  setPassword: (e: any) => void;

  sessionToken: any;
  userId: any;
  setOpen: (e: any) => void;
  open: any;
};

type myState = {
  previousPassword: string;
 

  update: boolean;
  setUpdate: (e: any) => void;
};

type studentUser = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

class EditStudentAccounts extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      previousPassword:this.props.password,
      update: false,
      setUpdate: (e) => {
        this.setState({ update: e });
      },
    };
  }


  handleClickClose = () => {
    this.props.setOpen(false);
  };

  handleSubmit = (e:any) => {
    e.preventDefault()
    
    const studentUser: studentUser = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
    };
    if (this.props.password !== this.props.userId.password && this.props.password !== "") {
      studentUser.password = this.props.password;
    } 
    
    console.log(studentUser)
    fetch(`http://localhost:4000/user/${this.props.userId.id}`, {
      method: "PUT",
      body: JSON.stringify({
        studentUser,
        // studentUser: {
        //   firstName: this.props.firstName,
        //   lastName: this.props.lastName,
        //   email: this.props.email,
        //   password: this.props.password

        // },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.state.setUpdate(true);

        this.props.fetchTeacherData();
        this.props.setOpen(false);
      });
  };

  //WHY ISN'T THIS REDIRECT WORKING?
  checkForUpdate = () => {
    if (this.state.update) {
      return <Redirect to="/adminDash" />;
    }
    console.log(this.state.update);
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
            Edit Student User Information
          </Typography>
        </DialogTitle>
        <form onSubmit={this.handleSubmit} noValidate>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              onChange={(e) => {
                this.props.setFirstName(e.target.value);
              }}
              defaultValue={this.props.userId.firstName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              type="text"
              fullWidth
              onChange={(e) => {
                this.props.setLastName(e.target.value);
              }}
              defaultValue={this.props.userId.lastName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={(e) => {
                this.props.setEmail(e.target.value);
              }}
              defaultValue={this.props.userId.email}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => {
                this.props.setPassword(e.target.value);
              }}
              // defaultValue={this.props.userId.password}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.handleClickClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
        {this.checkForUpdate()}

      </Dialog>
    );
  }
}

export default EditStudentAccounts;
