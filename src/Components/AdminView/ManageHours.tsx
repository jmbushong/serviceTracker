import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


import ButtonGroup from "@material-ui/core/ButtonGroup";
import AdminSitebar from "../Sitebar/AdminSitebar"
import Button from "@material-ui/core/Button"




type AcceptedProps = {
    sessionToken?: any;
    backArrowToggle: any;
    classCode?: any;
    teacherAccount: any;
    // arrowHandler: any;
    clearToken: any;
    setBackArrowToggle: (e: any) => void;
    setIsAdminTrue: (e: any) => void;
  };
  

type myState = {
  open: any;
  itemId: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  setOpen: (e: any) => void;
};

export default class ManageHoursTable extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
        serviceRequests:[],
        setServiceRequests: (e) => {
            this.setState({ serviceRequests: e })
          },

      itemId: 100,
      open: false,
      setOpen: (e) => {
        this.setState({ open: e });
      },
    };
  }

  componentDidMount() {
    this.fetchServiceRequests();
    this.props.setBackArrowToggle(true);
    this.props.setIsAdminTrue(true);

  }
  fetchServiceRequests = () => {
    fetch("http://localhost:4000/service/all", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.state.setServiceRequests(json); 
        console.log(this.state.serviceRequests);
    
      });
  };

  


  render() {
    return (
      <TableContainer
        // style={{ paddingLeft: "15px", paddingRight: "15px" }}
        style={{marginTop:"15px"}}
        component={Paper}
      >
          <AdminSitebar
            backArrowToggle={this.props.backArrowToggle}
            // arrowHandler={this.props.arrowHandler}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
          />
       
            
            <Box style={{ background: "#ef476f",color:"white", padding: "0px",margin: "50px", width: "80%"}}>
              <Box >
                {" "}
              <h2 style={{marginLeft:"25px"}}>Service Hours </h2>
      
              <Box
            className="studentChart"
            style={{ background: "white", padding: "0px" }}
          >
           
            
            <Box className="toRight">
              
              
              {" "}
              <ButtonGroup
                style={{ background: "white" }}
                className="toRight"
                disableElevation
                variant="contained"
                aria-label="text primary button group"
              >
                
      
            
              </ButtonGroup>
            </Box>
          </Box>
              
              
              
          
              </Box>
            </Box>
        <Table style={{margin:"50px", width: "80vw"}}>
         
          <TableHead>
         
            <TableRow >
              <TableCell />

            
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            
              <TableCell align="left">Description</TableCell>
           
            
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.serviceRequests.length > 0 ? (
              this.state.serviceRequests.map((service: any, index: any) => (
                <React.Fragment key={this.state.serviceRequests.id}>
                 
                  <TableRow style={{height:"45px", marginRight:"3px", marginLeft:"3px"}}> 
                 
                    
                    <TableCell align="left" style={{marginLeft: "50px"}}>
                   
                    </TableCell>
                    <TableCell align="left" >
                      {" "}
                      {this.state.serviceRequests[index]?.studentUser.firstName}
                      { " "}
                      {this.state.serviceRequests[index]?.studentUser.lastName}<br></br>
                
                    </TableCell>
                <TableCell></TableCell>
 
                  
                    <TableCell align="left">
                    {this.state.serviceRequests[index]?.date}<br></br>
                    {this.state.serviceRequests[index]?.hours} hour(s)<br></br>
                    {this.state.serviceRequests[index]?.description}
                  
                   
                    
                    </TableCell>
              
                    <TableCell align="center">
                        
                        <Button color="primary" variant="contained">Approved</Button>
                     
                        <Button color="secondary" variant="contained">Denied</Button>
                        
                         </TableCell>
                  </TableRow>
                  <TableRow>
                 
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}


// import React, {Component} from 'react';


// class ManageHoursTable extends React.Component {

//     render() { 
//         return (  <div>Enter Content Here</div>);
//     }
// }
 
// export default ManageHoursTable;