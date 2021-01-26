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
       
            <Box style={{ background: "white",color:"white", padding: "10px", width: "100%"}}>
              <Box >
       
      
              <Box
            className="studentChart"
            style={{ background: "white", padding: "0px" }}
          >
               <TextField
             style={{marginLeft:"20px", width: "150px"}}
              label="Search by Name"
              margin="normal"
              variant="outlined"
            > </TextField>
            
            <TextField
             style={{marginLeft:"20px", width: "150px"}}
              label="Search by Hours"
              margin="normal"
              variant="outlined"
            > </TextField>
            
           


     
          </Box>
              
              
              
          
              </Box>
            </Box>
        <Table aria-label="collapsible table" >
         
          <TableHead>
         
            <TableRow style={{marginLeft:"10px"}} >
        

             
            <TableCell align="center">Rank</TableCell>
             
              <TableCell>Name</TableCell>
              <TableCell>Hours</TableCell>
             <Hidden xsDown> <TableCell >See More</TableCell></Hidden>
         
            </TableRow>
          </TableHead>
          <TableBody>
            
                <React.Fragment >
                 
                  <TableRow style={{height:"45px", marginRight:"3px"}}> 
                    <TableCell align="center">1</TableCell>
        
                    <TableCell align="left">
                        Jessica Smith
                        
                 
                    </TableCell>

                    <TableCell align="left" > 20 </TableCell>
                    <Hidden xsDown>       <TableCell>Click Here
                     
                    </TableCell></Hidden>
              
                   
                  </TableRow>
                </React.Fragment>
                <React.Fragment >
                 
                  <TableRow style={{height:"45px", marginRight:"3px"}}> 
                    <TableCell align="center">1</TableCell>
        
                    <TableCell align="left">
                        Jessica Smith
                        
                 
                    </TableCell>

                    <TableCell align="left" > 20 </TableCell>
                    <Hidden xsDown>       <TableCell>Click Here
                     
                    </TableCell></Hidden>
              
                   
                  </TableRow>
                </React.Fragment>
              
                <React.Fragment >
                 
                 <TableRow style={{height:"45px", marginRight:"3px"}}> 
                   <TableCell align="center">1</TableCell>
       
                   <TableCell align="left">
                       Jessica Smith
                       
                
                   </TableCell>

                   <TableCell align="left" > 20 </TableCell>
                   <Hidden xsDown>       <TableCell>Click Here
                    
                   </TableCell></Hidden>
             
                  
                 </TableRow>
               </React.Fragment>
             
              
            
          </TableBody>
        </Table>
      </TableContainer>
         </>
        )}}

export default StudentLeaderboard