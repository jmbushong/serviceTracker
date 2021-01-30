import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";
import API_URL from "../../../environment";


type AcceptedProps = {
  sessionToken?: any;
  eventInfo: any;
  setOpen: (e: any) => void;
fetchEvents:any;
  open: any;
};



type myState = {
  date: any;
  title: string;
  description: string;
  hours: number;
  location: string;
  eventUpdate:boolean;
  setEventUpdate:(e:any)=> void;
  setDate: (e: any) => void;
  setTitle: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setLocation: (e: any) => void;
};

class AddEvent extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      date: "",
      location: "",
      description: "",
      hours: 900,
      title: " ",
      eventUpdate:false,
      setEventUpdate: (e) => {this.setState({eventUpdate: e})},
      setDate: (e) => {this.setState({date: e})},
      setLocation: (e) => {this.setState({location: e})},
      setHours: (e) => {this.setState({hours: e})},
      setDescription: (e) => {this.setState({description: e})},
      setTitle: (e) => {this.setState({title: e})}
    };
  }

  handleSubmit = (event: any) => {
   
    event.preventDefault();
    fetch(`${API_URL}/events/`, {
      method: "POST",
      body: JSON.stringify({
        events: {
          date: this.state.date,
          title: this.state.title,
          description: this.state.description,
          hours: this.state.hours,
          location: this.state.location,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Event submission was successful");
        this.state.setEventUpdate(true);
        // set each prop to empty
        this.state.setDate("");
        this.state.setHours(0);
        this.state.setTitle("");
        this.state.setDescription("");
        this.state.setLocation("");
        this.props.setOpen(false);
        this.props.fetchEvents();
      } else {
        console.log("Event submission failed");
      }
      return response.json();
    });
  };

  checkForEventEntry=() => {
    if (this.state.eventUpdate){
      return <Redirect to="/adminDash"/>
    }
  }

  handleClickClose = () => {
    this.props.setOpen(false);
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
            Add Event
          </Typography>
        </DialogTitle>
        <form onSubmit={this.handleSubmit} noValidate>
        <DialogContent>
         
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
                      console.log(this.state.date)
                    }}
                    defaultValue={0}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <FormControl style={{ minWidth: 160 }}>
                  <TextField
                      autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title of Event"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                    
                      this.state.setTitle(e.target.value);
                     
                    }}
                    defaultValue={" "}
                  />
                  <TextField
                      autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Location"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                    
                      this.state.setLocation(e.target.value);
                     
                    }}
                    defaultValue={" "}
                  />
                </FormControl>{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Event Description"
                  type="text"
                  onChange={(e) => {
              
                    this.state.setDescription(e.target.value);
                   
                  }}
                  defaultValue={" "}
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
                    onChange={(e) => {
                 
                      this.state.setHours(e.target.value);
                   
                    }}
                    defaultValue={0}
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
             
                <Button
              
                  type="submit"
                >
                  Submit
                </Button>
       
            </DialogActions>
            <Grid container justify="flex-end"></Grid>
     
        </DialogContent> </form>
        {this.checkForEventEntry()}
      </Dialog>
    );
  }
}

export default AddEvent;
