import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Sitebar from '../Sitebar/Sitebar';
import { Redirect } from "react-router-dom";

type AcceptedProps = {    
  setIsAdminFalse: any;
  isAdmin:any;
  sessionToken?: any;
  backArrowToggle: any;
  arrowHandler: any;
  clearToken: any;
};

class ViewEvents extends React.Component  <AcceptedProps, {}> {
  componentDidMount(){
    this.props.arrowHandler();
    this.props.setIsAdminFalse(false);
    if (!this.props.sessionToken) {
      return <Redirect to="/" />;
    } else if (this.props.isAdmin === false) {
      return <Redirect to="/myDashboard" />;
    } else {
      return <Redirect to="/admindash" />;
    }
  }
    render() { 
        return (   <div>
          <Sitebar
                  backArrowToggle={this.props.backArrowToggle}
                  arrowHandler={this.props.arrowHandler}
                  clearToken={this.props.clearToken}
                  sessionToken={this.props.sessionToken}
          /> 
        <h2 style={{textAlign:"center", marginTop:"50px", marginBottom:"50px"}}>Upcoming Service Opportunities</h2><div className="viewEvents">
        <Accordion square >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Peer Tutoring</Typography>
            
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>School Recycling</Typography>
          </AccordionSummary>
          <AccordionDetails>
              
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Sporting Concessions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Animal Shelter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>GoodVibes Campaign</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div></div>  );
    }
}
 
export default ViewEvents;