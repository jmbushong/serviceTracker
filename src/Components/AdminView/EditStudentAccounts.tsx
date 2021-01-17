import React, {Component} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

type AcceptedProps = {
    userId: any;
    setOpen: (e: any) => void;
    open: any;
  };
  
  

class EditStudentAccounts extends React.Component<AcceptedProps, {}> {

    handleClickClose = () => {
        this.props.setOpen(false);
      };
    

    render() { 
        return (   <Dialog open={this.props.open}>
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
            <form noValidate>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="First Name"
                  type="email"
                  fullWidth
                  defaultValue={this.props.userId.firstName}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Last Name"
                  type="email"
                  fullWidth
                  defaultValue={this.props.userId.lastName}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  defaultValue={this.props.userId.email}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Password"
                  type="email"
                  fullWidth
                 
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
                <Button>Submit</Button>
              </DialogActions>
            </form>
          </Dialog>);
    }
}
 
export default EditStudentAccounts;