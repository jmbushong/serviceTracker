import React, { Component } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AdminSitebar from "../../Sitebar/AdminSitebar";
import Box from "@material-ui/core/Box";
import Sitebar from "../../Sitebar/Sitebar";
import Chart from "../../StudentView/StudentDashboard/StudentViewDashboard/Chart";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

type AcceptedProps = {
  sessionToken?: any;
  backArrowToggle: any;
  // arrowHandler: any;
  clearToken: any;
  setBackArrowToggle: (e: any) => void;
};

type myState = {
  eventInfo: any;
  setEventInfo: (e: any) => void;
};

class EventSchedule extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      eventInfo: [],
      setEventInfo: (entry) => {
        this.setState({ eventInfo: entry });
      },
    };
  }

  componentDidMount() {
    this.props.setBackArrowToggle(true);
    this.fetchService();
  }

  deleteEvent = async (id:number) => {

    try { 
      const response = await fetch(
        `http://localhost:4000/events/${id}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          }),
        }
      );
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
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          Upcoming Service Opportunities
        </h2>
        <div></div>
        <div className="viewEvents">
          <Box style={{ background: "#F6D55C", padding: "0px", width: "100%" }}>
            <Box className="toRight">
              {" "}
              <ButtonGroup
                style={{ background: "#F6D55C" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                <Link to="/addevents">
                  <Button style={{ background: "#F6D55C", marginLeft: "60px" }}>
                    <AddBoxIcon />
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Box>
          {this.state.eventInfo.length > 0 ? (
            this.state.eventInfo.map((event: any, index: any) => (
              <Accordion key={this.state.eventInfo.id} square>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                
                  <Typography style={{ marginLeft: "15px" }}>
                    {this.state.eventInfo[index].title}
                  </Typography>
                  <div style={{ marginLeft: "auto" }}>
                    <EditIcon />
                    <DeleteIcon
                     onClick={() => {
                   
                      try{ 
                       
                        this.deleteEvent(this.state.eventInfo[index]?.id)
                        console.log(this.state.eventInfo[index]?.id)
                        
                        ;} 
                      catch (err) {
                        console.log(err);
                      }}
                    
                    }
                    />
                  </div>
                </AccordionSummary>
            <AccordionDetails style={{ padding: "0px 30px"}}>
                
                <Typography>
                  <p style={{ fontSize: "12px"}}>Date:</p>
                </Typography>
                <Typography>
                    <p style={{ fontSize: "12px",  marginLeft:"100px"  }}>Location: </p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px",  marginLeft:"100px"  }}>Hours: </p>
                  </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>
                  <p style={{  fontSize: "12px", marginLeft:"15px" }}> {this.state.eventInfo[index].date}</p>
                </Typography>
                <Typography>
                    <p style={{ fontSize: "12px" , marginLeft:"68px"  }}>{this.state.eventInfo[index].location}</p>
                  </Typography>
                  <Typography>
                    <p style={{ fontSize: "12px" , marginLeft:"110px"  }}>{this.state.eventInfo[index].hours}</p>
                  </Typography>
                
                
              </AccordionDetails>

              
             
   
                <AccordionDetails style={{ padding: "0px 30px"}}>
                  <Typography>
                    <p style={{ fontSize: "12px" }}>Event Description:</p>
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>
                    <p style={{  fontSize: "12px", padding:"0px 15px" }}> {this.state.eventInfo[index].description}</p>
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
