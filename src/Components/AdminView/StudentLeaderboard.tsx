import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
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
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { SettingsPowerRounded } from "@material-ui/icons";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";

import Hidden from "@material-ui/core/Hidden";


class StudentLeaderboard extends React.Component {

    render() { 
        return (  
       <>
            
        
            <br></br>
            <Typography
          className="adminTitle marginClassTotals"
          component="h2"
          variant="h5"
          
        //   style={{ textAlign: "center", height:"50px", paddingLeft:"30px",  color: "black", marginTop:"90px" }}
        >
          Class Totals
        </Typography>
    <TableContainer
        // style={{ paddingLeft: "15px", paddingRight: "15px" }}
        style={{marginTop:"5px"}}
        component={Paper}
      >
       
            <Box style={{ background: "white",color:"white", padding: "0px", width: "100%"}}>
              <Box >
                {" "}
              <h2 style={{marginLeft:"25px"}}> </h2>
              
      
              <Box
            className="studentChart"
            style={{ background: "white", padding: "0px" }}
          >
               <TextField
             style={{marginLeft:"30px"}}
              label="Search by Name"
              margin="normal"
              variant="outlined"
            > </TextField>
            
            <TextField
             style={{marginLeft:"20px"}}
              label="Search by Hours"
              margin="normal"
              variant="outlined"
            > </TextField>
            
           


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
        <Table aria-label="collapsible table">
         
          <TableHead>
         
            <TableRow >
              <TableCell />

              <IconButton size="small">
                <TableCell></TableCell>
              </IconButton>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Total Hours</TableCell>
             <Hidden xsDown> <TableCell align="center">See More</TableCell></Hidden>
         
            </TableRow>
          </TableHead>
          <TableBody>
            
                <React.Fragment >
                 
                  <TableRow style={{height:"45px", marginRight:"3px", marginLeft:"3px"}}> 
                    <TableCell></TableCell>
                    <IconButton
                     
                    >
              
                    </IconButton>
                    <TableCell align="left">
                 
                    </TableCell>

                    <TableCell align="left">
                   
                    </TableCell>
                    <Hidden xsDown>       <TableCell align="center">
                     
                    </TableCell></Hidden>
              
                    <TableCell align="center" >  </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                     
                  
                    >
                      <Collapse
              
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box style={{ padding: "5px" }} margin={1}>
                          <Box className="editIcon">
                            <h5 style={{ marginRight: "auto" }}>Details</h5>
                            
                     
                      
                          </Box>

                          <p style={{ padding: "15px" }}>
                          <Hidden smUp>      
                      Hours: <br></br> Description: 
                   </Hidden>
                         
                          </p>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              
            
          </TableBody>
        </Table>
      </TableContainer>
         </>
        )}}

export default StudentLeaderboard