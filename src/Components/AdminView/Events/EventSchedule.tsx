import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
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
  eventId: any;
  setEventId: (e: any) => void;
  date: any;
  setDate: (e: any) => void;
 title: any;
  setTitle: (e: any) => void;

  setOpen: (e: any) => void;
  open: any;
  setOpen2: (e: any) => void;
  open2: any;
  oneEvent: any;
  setOneEvent: (e: any) => void;
};

class EventSchedule extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      date: "",
      setDate: (entry) => {
        this.setState({ date: entry });
      },
     title: "",
      setTitle: (entry) => {
        this.setState({ date: entry });
      },
      oneEvent: [],
      eventInfo: [],
      setOneEvent: (entry) => {
        this.setState({ oneEvent: entry });
      },
      setEventInfo: (entry) => {
        this.setState({ eventInfo: entry });
      },
      eventId: 900,
      setEventId: (entry) => {
        this.setState({ eventId: entry });
      },
      open: false,
      setOpen: (entry) => {
        this.setState({ open: entry });
      },
      open2: false,
      setOpen2: (entry) => {
        this.setState({ open2: entry });
      },
    };
  }

  handleClickOpen = () => {
    this.state.setOpen(true);
  
    
  };

  handleClickClose = () => {
    this.state.setOpen(false);
  };

  componentDidMount() {
    this.props.setIsAdminTrue(true);
    this.props.setBackArrowToggle(true);
    this.fetchEvents();
    
  }

  handleClickOpen2 = () => {
    this.state.setOpen2(true);
  };

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
      this.fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  fetchEvents = () => {
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

  fetchEventRequests = (id:any) => {
    fetch(`http://localhost:4000/events/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.state.setOneEvent(json);
        console.log(this.state.oneEvent);
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
        <Typography
          className="adminTitle"
          component="h2"
          variant="h5"
          style={{ textAlign: "center", margin: "30px" }}
        >
          Upcoming Events
        </Typography>
        <div></div>
        <div className="viewEvents">
          <Box style={{ background: "#5390d9", padding: "0px", width: "100%" }}>
            <Box className="toRight">
              {" "}
              <Button
                style={{ background: "#5390d9" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                <Button style={{ background: "white", marginLeft: "60px" }}>
                  <AddBoxIcon
                    onClick={() => {
                      this.handleClickOpen();
                    }}
                  />
                </Button>
              </Button>
            </Box>
          </Box>
          {this.state.eventInfo.length > 0 ? (
            this.state.eventInfo.map((event: any, index: any) => (
              <Accordion
                style={{ margin: "1px" }}
                key={this.state.eventInfo.id}
                square
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography style={{ marginLeft: "15px" }}>
                    {this.state.eventInfo[index].date}
                  </Typography>
                  <Typography style={{ marginLeft: "35px" }}>
                    {this.state.eventInfo[index].title}
                  </Typography>
                  <div style={{ marginLeft: "auto" }}>
                    <EditIcon
                      onClick={() => {
                        this.handleClickOpen2();
                        this.setState({
                          eventId: this.state.eventInfo[index],
                        });
                        this.fetchEventRequests(this.state.eventInfo[index]?.id)
                        console.log(this.state.eventId);
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

                    <div>
                     
                      <UpdateEvent
                        open2={this.state.open2}
                        eventInfo={this.state.eventInfo}
                        setEventInfo={this.state.setEventInfo}
                        setOpen2={this.state.setOpen2}
                        eventId={this.state.eventId}
                        sessionToken={this.props.sessionToken}
                        fetchEvents={this.fetchEvents}
                        oneEvent={this.state.oneEvent}
                        setOneEvent={this.state.setOneEvent}


                      />
                      <AddEvents
                        fetchEvents={this.fetchEvents}
                        open={this.state.open}
                        eventInfo={this.state.eventInfo}
                        setOpen={this.state.setOpen}
                        sessionToken={this.props.sessionToken}
                      />
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
            <div>
              You currently have no events scheduled
              <AddEvents
                fetchEvents={this.fetchEvents}
                open={this.state.open}
                eventInfo={this.state.eventInfo}
                setOpen={this.state.setOpen}
                sessionToken={this.props.sessionToken}
              />
            </div>
          )}
        </div>
        {console.log(this.state.eventInfo.title)}
      </div>
    );
  }
}

export default EventSchedule;
