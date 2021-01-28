import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import API_URL from "../../environment";
import Hidden from "@material-ui/core/Hidden";

type AcceptedProps = {

  sessionToken: any;

};

let arr: any = [0];
let sum: number = 0;
const add = (a: number, b: number) => a + b;

type myState = {
  userId:any;
  user: any;
  rank:any;
  userServices:any;
  setUserServices: (e: any) => void;
  setUser: (e: any) => void;
};
class StudentLeaderboard extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userId:"",
      rank:1,
  user: [],
  userServices: [],
      setUser: (e) => {
        this.setState({ user: e });
      },
      setUserServices: (e) => {
        this.setState({ userServices: e });
      },
    };
  }
  arrLength = () => {
    arr.length = 0;
  };

  percentage = (e:any) => {
    { this.arrLength()}
    {
      console.log(e?.services)
      e.services?.length > 0 ? e?.services.map((service:any, index:any) =>
 
      arr.push(e?.services[index].status === "Approved" 
      ? e?.services[index].hours: 0)): console.log("did not work")
   
    }
    {e?.services.length > 0 ?
       (sum =arr.reduce(add)): 
       (sum=0)}
    {console.log(sum)} 
    {this.handleTotalHours(e.id)}
    // {
      // this.state.user[e].services.length > 0
      //   ? this.state.user.services?.map((service: any, index: any) =>
      //       arr.push(
      //         this.state.user[index].status === "Approved"
      //           ? this.state.user.service[index].hours
      //           : 0
      //       )
      //     )
      //   : console.log("did not work");
    // }
    // {
      // this.props.serviceRequests.length > 0
      //   ? (sum = arr.reduce(add))
      //   : (sum = 0);
    // }
  };

  handleTotalHours = (id: any) => {
    // id.preventDefault();

    fetch(`${API_URL}/user/totalHours/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        studentUser: {
          totalHours: sum,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
       

      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  fetchUsers = () => {
    fetch(`${API_URL}/user/allbyhours`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
  

           
        this.state.setUser(json); //taking information from the server and setting it to our state
        
        console.log(this.state.user);
   
      });
  };


  componentDidMount() {
    
    this.fetchUsers();
    this.arrLength()
    console.log(this.state.user);
  }

  render() {
    return (
      <>
        <br></br>
        <Typography
          className="adminTitle marginClassTotals"
          component="h2"
          variant="h5"

        >
          Class Totals
        </Typography>
        <TableContainer
       
          style={{ marginTop: "5px" }}
          component={Paper}
        >
          <Box
            style={{
              background: "white",
              color: "white",
              padding: "10px",
              
            }}
          >
            <Box>
              <Box
                className="studentChart"
                style={{ background: "white", padding: "0px" }}
              >
                {/* <TextField
                  style={{ marginLeft: "20px", width: "150px" }}
                  label="Search by Name"
                  margin="normal"
                  variant="outlined"
                >
                  {" "}
                </TextField> */}

             
              </Box>
            </Box>
          </Box>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ marginLeft: "10px" }}>
                <TableCell align="center">Rank</TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Hours</TableCell>
                <Hidden xsDown>
                  {" "}
                  <TableCell>See More</TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              
            {this.state.user.length > 0 ? (
             
              this.state.user.map((user: any, index: any) => (
                
             

              <React.Fragment key={index}>
                <TableRow style={{ height: "45px", marginRight: "3px" }}>
                  <TableCell align="center">{index + 1} </TableCell>

                  <TableCell align="left">{user.firstName} {" "}
                  {user.lastName} {this.handleTotalHours(user.id)} {console.log(user)}
                  </TableCell>

                  <TableCell align="left"> {this.percentage(user)} {user.totalHours} </TableCell>
                  <Hidden xsDown>
                    {" "}
                    <TableCell>Click Here</TableCell>{this.handleTotalHours(user.id)} 
                  </Hidden>
                </TableRow>
       
               
              </React.Fragment>  
              ))
            ) : (
              <div></div>
            )}

             
            </TableBody>
          </Table>
          { this.arrLength()}
          {console.log(sum)}
          
        </TableContainer>
      </>
    );
  }
}

export default StudentLeaderboard;
