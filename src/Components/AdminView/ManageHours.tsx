import React from "react";

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AdminSitebar from "../Sitebar/AdminSitebar";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  statusView: any;
  status?: any;
  open: any;
  itemId: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  setOpen: (e: any) => void;
  update: boolean;
  setUpdate: (e: any) => void;
};

export default class ManageHoursTable extends React.Component<
  AcceptedProps,
  myState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      statusView: "awaiting",
      status: "Awaiting Approval",
      serviceRequests: [],
      setServiceRequests: (e) => {
        this.setState({ serviceRequests: e });
      },
      update: false,
      setUpdate: (e) => {
        this.setState({ update: e });
      },
      // setStatusView: (e) => {
      //   this.setState({ statusView: e });
      // },

      itemId: 100,
      open: false,
      setOpen: (e) => {
        this.setState({ open: e });
      },
    };
  }

  componentDidMount() {
    this.fetchServiceRequests("awaiting");
    // this.props.setBackArrowToggle(true);
    this.props.setIsAdminTrue(true);
  }
  handleSubmit = (id: any) => {
    // id.preventDefault();

    fetch(`http://localhost:4000/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "approved",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
        this.state.setUpdate(true);
        this.fetchServiceRequests("awaiting");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  handleSubmit2 = (id: any) => {
    // id.preventDefault();

    fetch(`http://localhost:4000/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "denied",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
        this.fetchServiceRequests("awaiting");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  handleSubmit3 = (id: any, currentStatus: any) => {
    // id.preventDefault();

    fetch(`http://localhost:4000/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "Awaiting Approval",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");

        currentStatus === "approved"
          ? this.fetchServiceRequests("approved")
          : this.fetchServiceRequests("denied");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  fetchServiceRequests = (e: any) => {
    // let url= `http://localhost:4000/service/nostatus`
    // let url2= `http://localhost:4000/service/${e}`
    let url: any;

    if (e !== undefined) {
      url = `http://localhost:4000/service/${e}`;
    } else {
      url = "http://localhost:4000/service/awaiting";
    }

    fetch(url, {
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
        style={{ marginTop: "40px", height: "100vh" }}
        // component={Paper}
      >
        {/* <AdminSitebar
          backArrowToggle={this.props.backArrowToggle}
          // arrowHandler={this.props.arrowHandler}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}
        /> */}

        <Box
          style={{
            color: "black",
            padding: "0px",
            margin: "50px",
          }}
        >
          <Box style={{ marginTop: "0px" }}>
            {" "}
            <h2
              className="adminTitle"
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              Manage Hours{" "}
            </h2>
            <Box className="studentChart" style={{ paddingTop: "10px" }}>
              <FormControl style={{ width: "200px" }}>
                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={"awaiting"}
                  onChange={(e) => {
                    console.log(e.target.value);
                    this.fetchServiceRequests(e.target.value);
                    this.setState({ statusView: e.target.value });
                  }}
                >
                  <MenuItem value={"awaiting"}>Awaiting Approval</MenuItem>
                  <MenuItem value={"approved"}>Approved</MenuItem>
                  <MenuItem value={"denied"}>Denied</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Table style={{ marginLeft: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell />

              {/* <TableCell>Name</TableCell> */}
              <TableCell></TableCell>

              <TableCell align="left">Description</TableCell>

              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.serviceRequests.length > 0 ? (
              this.state.serviceRequests.map((service: any, index: any) => (
                <React.Fragment key={this.state.serviceRequests.id}>
                  <TableRow
                    style={{
                      height: "45px",
                      marginRight: "3px",
                      marginLeft: "3px",
                    }}
                  >
                    <TableCell
                      align="left"
                      style={{ marginLeft: "50px" }}
                    ></TableCell>
                    {/* <TableCell align="left">
            
                      {
                        this.state.serviceRequests[index]?.studentUser.firstName
                      }
                      {this.state.serviceRequests[index]?.studentUser.lastName}
                      <br></br>
                    </TableCell> */}
                    <TableCell></TableCell>

                    <TableCell align="left">
                      
                      <h4>{this.state.serviceRequests[index]?.studentUser.firstName}{" "} {this.state.serviceRequests[index]?.studentUser.lastName}</h4>
                   
                      Hours: {this.state.serviceRequests[index]?.hours}{" "}
                      <br></br>
                      Date: {this.state.serviceRequests[index]?.date} <br></br> <br></br>
                
                      {this.state.serviceRequests[index]?.description}
                      <br></br>
                      <br></br>
                  
                     
                    </TableCell>
                    {this.state.statusView === "awaiting" ? (
                      <TableCell align="center">
                        <Button
                          style={{
                            backgroundColor: "#06d6a0",
                            marginTop:"5px",
                            color: "white",
                            marginRight: "10px",
                            width: "100px",
                            height: "60px",
                          }}
                          variant="contained"
                          onClick={() => {
                            this.setState({ status: "approved" });
                            this.handleSubmit(
                              this.state.serviceRequests[index]?.id
                            );
                          }}
                        >
                          Approve
                        </Button>

                        <Button
                          style={{
                            backgroundColor: "#ef476f",
                            height: "60px",
                            color: "white",
                            marginRight: "10px",
                            marginTop:"5px",
                            width: "100px",
                          }}
                          variant="contained"
                          onClick={() => {
                            this.setState({ status: "denied" });
                            this.handleSubmit2(
                              this.state.serviceRequests[index]?.id
                            );
                          }}
                        >
                          Deny
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell  align="center">
                        <Button
                         
                          style={{
                            backgroundColor: "#ffd166",
                        
                            marginRight: "30px",
                            marginLeft:"30px",
                            width: "80px",
                            height: "50px",
                          }}
                          variant="contained"
                          onClick={() => {
                            // this.setState({ status: "awaiting approval" });
                            this.handleSubmit3(
                              this.state.serviceRequests[index]?.id,
                              this.state.statusView
                            );
                          }}
                          //add a second parameter & use that parameter as ternary in handlesubmit3
                        >
                          Undo
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow></TableRow>
                </React.Fragment>
              ))
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
        {console.log(this.state.status)}

        {console.log(this.state.statusView)}
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
