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
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

type AcceptedProps = {
  eventInfo: any;
  eventId: any;
    setOpen2: (e: any) => void;
    open2: any;
  };

  type myState ={
    setDate: (e: any) => void;
    date: any;
  }
  
  

class UpdateEvent extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
  
      date: "",
      setDate: (e) => {this.setState({date: e})},
   
    };
 
  }
    handleClickClose = () => {
        this.props.setOpen2(false);
      };
    

    render() { 
        return (   <Dialog open={this.props.open2}>
          <DialogTitle id="form-dialog-title">
          <Typography className="adminTitle" component="h2"
variant="h5"  style={{ textAlign: "center" }}>Update Event</Typography>
            
          </DialogTitle>
          <DialogContent>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <form noValidate>
                    <TextField
                      id="date"
                      label="Date of Service"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        this.state.setDate(e.target.value);
                      
                      }}
                      defaultValue={this.props.eventId.date}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <FormControl style={{ minWidth: 160 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Title of Event"
                      type="email"
                      fullWidth
                      defaultValue={this.props.eventId.title}
                     
                    
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Location"
                      type="email"
                      fullWidth
                      defaultValue={this.props.eventId.location}
                    />
                  </FormControl>{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Event Description"
                    type="text"
                  
                    defaultValue={this.props.eventId.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    style={{
                      minWidth: 160,
                      marginBottom: "25px",
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Number of Hours
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={this.props.eventId.hours}
                    
                      //   value={age}
                      //   onChange={handleChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>{" "}
                </Grid>
              </Grid>

              <DialogActions>
                <Button
                  onClick={() => {
                    this.handleClickClose();
                  }}
                >
                  Cancel
                </Button>
                <Link to="/adminevent">
                  <Button
                    onClick={() => {
                      this.handleClickClose();
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Link>
              </DialogActions>
              <Grid container justify="flex-end"></Grid>
            </form>
          </DialogContent>
        </Dialog>);
    }
}
 
export default UpdateEvent;