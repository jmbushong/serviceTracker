import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Sitebar from '../Sitebar/Sitebar';
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import API_URL from "../../environment";

type AcceptedProps = {   
 
  setIsAdminFalse: any;
  isAdmin:any;
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

class ViewEvents extends React.Component  <AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      eventInfo: [],
      setEventInfo: (entry) => {
        this.setState({ eventInfo: entry });
      },
    };
  }

  componentDidMount(){
    this.props.setBackArrowToggle(true);
    this.fetchService();
    this.props.setIsAdminFalse(false);
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  }

  fetchService = () => {
    fetch(`${API_URL}/events/studentview`, {
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
        return (   <div>
          {" "}
          {/* <Sitebar
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.props.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
          />{" "} */}
          {/* <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            Upcoming Service Opportunities
          </h2> */}
         
          <div className="viewEvents">
            
            <Box style={{ background: "#5390d9", color:"white", padding: "0px", width: "100%" }}>
              <Box >
                {" "}
              <h2 style={{marginLeft:"25px"}}>Upcoming Events</h2>
                {/* <ButtonGroup
                  style={{ color: "black" }}
                  className="toRight"
                  disableElevation
                  variant="contained"
                  aria-label="text primary button group"
                >
                  <Link to="/addevents">
                    <Button style={{ color: "black", marginLeft: "60px" }}>
                     
                    </Button>
                  </Link>
                </ButtonGroup> */}
              </Box>
            </Box>
            {this.state.eventInfo.length > 0 ? (
              this.state.eventInfo.map((event: any, index: any) => (
                <Accordion style={{ margin: ".5px" }} key={this.state.eventInfo.id} square>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                  
                    <Typography style={{ marginLeft: "15px" }}>
                      {this.state.eventInfo[index].date} 
          
                    </Typography>
                    <Typography style={{ marginLeft: "45px" }}>
                     
                      {this.state.eventInfo[index].title}
                    </Typography>
                    <div style={{ marginLeft: "auto" }}>
                     
                    </div>
                  </AccordionSummary>
              <AccordionDetails style={{ padding: "0px 30px"}}>
                  
                
                  <Typography>
                      <p style={{ fontSize: "12px", marginRight:"100px"   }}>Location: {this.state.eventInfo[index].location} </p>
                      <p style={{ fontSize: "12px" }}>Hours: {this.state.eventInfo[index].hours} </p>
                    </Typography>
                    <Typography>
                      
                    </Typography>
                </AccordionDetails>
                <AccordionDetails>
     
    
                  
                  
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
              <div style={{marginTop: "30px"}}> There are no upcoming events. </div>
            )}
          </div>
          {console.log(this.state.eventInfo.title)}
        </div>
      );
    }
  }
 
export default ViewEvents;