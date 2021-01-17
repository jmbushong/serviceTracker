import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import Box from "@material-ui/core/Box";

import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuItem from "@material-ui/core/MenuItem";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import AdminSitebar from "../../Sitebar/AdminSitebar";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";

type AcceptedProps = {
  sessionToken?: any;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
  setIsAdminTrue: (e: any) => void;
};

type myState = {
  eventInfo: any;
  setEventInfo: (e: any) => void;
  setOpen: (e: any) => void;
  open: any;
  title: any;
  setTitle: (e: any) => void;

};

class EventSchedule extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      eventInfo: [],
      setEventInfo: (entry) => {
        this.setState({ eventInfo: entry });
      },
      open: false,
      setOpen: (entry) => {
        this.setState({ open: entry });
      },
      title: " ",
      setTitle: (entry) => {
        this.setState({ title: entry });
      },
    
    };
  }

  handleClickOpen = (e:any) => {
    this.state.setOpen(true);
    this.state.setTitle(e);
  };

  handleClickClose = () => {
    this.state.setOpen(false);
  };

  componentDidMount() {
    this.props.setIsAdminTrue(true);
    this.props.setBackArrowToggle(true);
    this.fetchService();
  }

  deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/events/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      });
      const json = await response.json();
      console.log(json);

      this.props.setBackArrowToggle(true);
      this.fetchService();
    } catch (err) {
      console.log(err);
    }
  };

  fetchService = () => {
    fetch(`http://localhost:4000/events`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.state.setEventInfo(json);
        console.log(this.state.eventInfo);
      });
  };

  render() {
    return (
      <div>
        {" "}
        <AdminSitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        />{" "}
        <Typography className="adminTitle" component="h2"
            variant="h5"  style={{ textAlign: "center",  margin: "30px"  }}>Upcoming Events</Typography>
        <div></div>
        <div className="viewEvents">
          <Box style={{ background: "#F6D55C", padding: "0px", width: "100%" }}>
            <Box className="toRight">
              {" "}
              <Button
                style={{ background: "#F6D55C" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                
                  <Button style={{ background: "#F6D55C", marginLeft: "60px" }}>
                    <AddBoxIcon    onClick={() => {
                        this.handleClickOpen("Add Event ");
                      }} /> 
                  </Button>
          
              </Button>
            </Box>
          </Box>
          {this.state.eventInfo.length > 0 ? (
            this.state.eventInfo.map((event: any, index: any) => (
              <Accordion style={{margin:"1px"}} key={this.state.eventInfo.id} square>
                <AccordionSummary
               
                 
                  
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                 
                  <Typography  style={{ marginLeft: "15px" }}>
                    {this.state.eventInfo[index].title}
                  </Typography>
                  <div style={{ marginLeft: "auto" }}>
                    <EditIcon
                      onClick={() => {
                        this.handleClickOpen('Update Event Details');
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        try {
                          this.deleteEvent(this.state.eventInfo[index]?.id);
                          console.log(this.state.eventInfo[index]?.id);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />

                    <div >
                      <Dialog open={this.state.open}>
                        <DialogTitle id="form-dialog-title">
                        <Typography className="adminTitle" component="h2"
            variant="h5"  style={{ textAlign: "center" }}>{this.state.title}</Typography>
                          
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
                                  />
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Location"
                                    type="email"
                                    fullWidth
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
                                  type="password"
                                  id="password"
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
                      </Dialog>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "0px 30px" }}>
                  <Typography>
                    <p style={{ fontSize: "12px" }}>Date:</p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "100px" }}>
                      Location:{" "}
                    </p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "100px" }}>
                      Hours:{" "}
                    </p>
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "15px" }}>
                      {" "}
                      {this.state.eventInfo[index].date}
                    </p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "68px" }}>
                      {this.state.eventInfo[index].location}
                    </p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "110px" }}>
                      {this.state.eventInfo[index].hours}
                    </p>
                  </Typography>
                </AccordionDetails>

                <AccordionDetails style={{ padding: "0px 30px" }}>
                  <Typography>
                    <p style={{ fontSize: "12px" }}>Event Description:</p>
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>
                    <p style={{ fontSize: "12px", padding: "0px 15px" }}>
                      {" "}
                      {this.state.eventInfo[index].description}
                    </p>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <div></div>
          )}
        </div>
        {console.log(this.state.eventInfo.title)}
      </div>
    );
  }
}

export default EventSchedule;
