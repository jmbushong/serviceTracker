import React, { Component } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvents";
import Box from "@material-ui/core/Box";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import AdminSitebar from "../../Sitebar/AdminSitebar";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import API_URL from "../../../environment";


//This component shows the Events that are currently scheduled
//This component also has links to EDIT EVENTS & ADD EVENTS
// Delete functionality is also built in here

type AcceptedProps = {
  sessionToken?: any;
  backArrowToggle: any;
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
  description: any;
  setDescription: (e: any) => void;
  location: any;
  setLocation: (e: any) => void;
  hours: any;
  setHours: (e: any) => void;

  setOpen: (e: any) => void;
  open: any;
  setOpen2: (e: any) => void;
  open2: any;
  oneEvent: any;
  setOneEvent: (e: any) => void;
  eventInfoIndex: any;
  setEventInfoIndex: (e: any) => void;
};

class EventSchedule extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      hours: "",
      setHours: (entry) => {
        this.setState({ hours: entry });
      },
      location: "",
      setLocation: (entry) => {
        this.setState({ location: entry });
      },
      description: "",
      setDescription: (entry) => {
        this.setState({ description: entry });
      },
      eventInfoIndex: [],
      setEventInfoIndex: (entry) => {
        this.setState({ eventInfoIndex: entry });
      },
      date: "",
      setDate: (entry) => {
        this.setState({ date: entry });
      },
      title: "",
      setTitle: (entry) => {
        this.setState({ title: entry });
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

  //This function opens up ADD EVENTS modal
  handleClickOpen = () => {
    this.state.setOpen(true);
  };

  //This function opens up the UPDATE EVENTS modal
  handleClickOpen2 = () => {
    this.state.setOpen2(true);
  };

  //This function closes the ADD EVENTS modal
  handleClickClose = () => {
    this.state.setOpen(false);
  };

  //When the component loads:
  //1. Admin is set as true. AKA If a user refreshes the page, they will be
  //redirected to admin landing
  //2. Back Arrow is Present on this page
  //3. Events are fetched, so the table can be populated
  componentDidMount() {
    this.props.setIsAdminTrue(true);
    // this.props.setBackArrowToggle(true);
    this.fetchEvents();
  }

  //This function deletes a specific event when the user clicks trashcan
  //After deleting the event, fetchEvents() is called, to get updated info
  deleteEvent = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
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

  //This fetch is specifically used to populate the chart
  fetchEvents = () => {
    fetch(`${API_URL}/events`, {
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

  //This fetch is called when the button is clicked and pulls info for individual event
  //Notice that it takes an argument that is specified down in the return
  //------This allow us to actually select a specific event
  //After the fetch is run, we update the state of all our variables
  //------This ensures that we have the most up-to-date info
  //------ when autopopulating our PUT form
  //-------It also makes sure that if a user only updates one detail
  //-------the rest of the items will have a value and not be blank

  fetchEventRequests = (id: any) => {
    fetch(`${API_URL}/events/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        console.log(json.date);
        this.state.setOneEvent(json);
        this.state.setDate(this.state.eventInfoIndex.date);
        this.state.setTitle(this.state.eventInfoIndex.title);
        this.state.setDescription(this.state.eventInfoIndex.description);
        this.state.setLocation(this.state.eventInfoIndex.location);
        this.state.setHours(this.state.eventInfoIndex.hours);
        console.log(this.state.oneEvent);
        console.log(this.state.date);
      });
  };

  render() {
    return (
      <div>
        {" "}
    
        <div></div>
        <div className="viewEvents responsiveMarginTopAdmin"  >

          <Box style={{ background: "#fafafa", padding: "0px",  marginLeft:"auto" }}>
          <Typography
          className="adminTitle "
          component="h2"
          variant="h5"
          style={{ textAlign: "center", height:"50px", paddingLeft:"30px",  color: "black" }}
        >
          Upcoming Events
        </Typography>
            
            <Box >
    
              <div
                style={{  width: "100%", display:"flex"}}
                className="toRight"
                
      
              >


                <Button  variant="contained"    style={{ backgroundColor:"#5390d9", color:"white", width:"150px" }}>
                  <AddBoxIcon
                    onClick={() => {
                      this.handleClickOpen();
                    }}
                  /> <h5 style={{ color:"white",  marginLeft:"5px"  }}>Add Event</h5> 
                </Button>
              </div>
            </Box>
          </Box>
          {this.state.eventInfo.length > 0 ? (
            this.state.eventInfo.map((event: any, index: any) => (
              <Accordion
                style={{ margin: "0px", backgroundColor: "white" }}
                key={this.state.eventInfo.id}
                square
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography style={{ marginLeft: "5px" }}>
                  {this.state.eventInfo[index].date} 
            
                   
                    
                  </Typography>
                  <Typography style={{ marginLeft: "55px" }}>
                
                  {this.state.eventInfo[index].title} <br></br>
                   
                    
                  </Typography>
               
                  <div style={{ marginLeft: "auto" }}>
                  {/* On this icon a few things are happening:
                  1. The modal opens. 
                  2. I'm storing the value of the index to a variable, so I can use this in UpdateEvents.tsx 
                  3. I'm sending the id of this entry to fetchEventRequests, so I can collect & store all info related to this id */}
                    <EditIcon
                      onClick={() => {
                        this.handleClickOpen2();

                        this.state.setEventInfoIndex(
                          this.state.eventInfo[index]
                        );
                        this.fetchEventRequests(
                          this.state.eventInfo[index]?.id
                        );
                      
                      }}
                    />
                    {/* To get the delete icon working, I need to be able to access the id of the specific event. I do this by passing the id into the deleteEvent function as an argument.  */}
                    <DeleteIcon
                      onClick={() => {
                        try {
                          this.deleteEvent(this.state.eventInfo[index]?.id);
                        
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    />

                    <div>
                      <UpdateEvent
                        hours={this.state.hours}
                        setHours={this.state.setHours}
                        location={this.state.location}
                        setLocation={this.state.setLocation}
                        title={this.state.title}
                        setDate={this.state.setDate}
                        setTitle={this.state.setTitle}
                        setDescription={this.state.setDescription}
                        description={this.state.description}
                        open2={this.state.open2}
                        date={this.state.date}
                        eventInfo={this.state.eventInfo}
                        eventInfoIndex={this.state.eventInfoIndex}
                        setOpen2={this.state.setOpen2}
                        sessionToken={this.props.sessionToken}
                        fetchEvents={this.fetchEvents}
                        oneEvent={this.state.oneEvent}
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
                    <p style={{ fontSize: "12px", marginRight:"45px" }}>
                    Location: {this.state.eventInfo[index].location} 
            
                    </p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px" }}>
               
                    Hours:     {this.state.eventInfo[index].hours}
                    </p>
                  </Typography>
                  {/* <Typography>
                    <p style={{ fontSize: "12px", marginLeft: "100px" }}>
                      Location:{" "}
                    </p>
                  </Typography> */}
          
                </AccordionDetails>
                <AccordionDetails>

           
    
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
            <div style={{marginTop: "30px"}}>
              You currently have no events scheduled.
              {/* I needed to put AddEvents here as well. Otherwise, the modal won't open unless a user has already created events */}
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
      </div>
    );
  }
}

export default EventSchedule;
