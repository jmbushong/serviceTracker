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
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { SettingsPowerRounded } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import API_URL from "../../../../environment";



type AcceptedProps = {
  setIndexNumber: any;
  sessionToken: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  indexNumber: any;
  setSpecificEntry: (e: any) => void;
  specificEntry: any;
};

type myState = {
  open: any;
  itemId: any;

  setOpen: (e: any) => void;
};

export default class Chart extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      itemId: 100,
      open: false,
      setOpen: (e) => {
        this.setState({ open: e });
      },
    };
  }

  componentDidMount() {
    this.fetchServiceRequests();
    console.log(this.props.serviceRequests);
  }
  fetchServiceRequests = () => {
    fetch(`${API_URL}/service`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.setServiceRequests(json); //taking information from the server and setting it to our state
        console.log(this.props.serviceRequests);
      });
  };

  

  deleteEntryAsync2 = async () => {
    try {
      const response = await fetch(
        `${API_URL}/service/${this.props.indexNumber}`,
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
      this.fetchServiceRequests();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <TableContainer
        // style={{ paddingLeft: "15px", paddingRight: "15px" }}
        style={{marginTop:"15px"}}
        component={Paper}
      >
       
            
            <Box style={{ background: "#ef476f",color:"white", padding: "0px", width: "100%"}}>
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
                
                <Link to="/addservice">
                  <Button style={{ color: "#ef476f" }}>
                    <AddBoxIcon style={{marginRight: "5px"}} /> Add Entry
                  </Button>
                </Link>
            
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
              <TableCell>Date of Service</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell align="center">Hours</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.serviceRequests.length > 0 ? (
              this.props.serviceRequests.map((service: any, index: any) => (
                <React.Fragment key={this.props.serviceRequests.id}>
                 
                  <TableRow style={{height:"45px", marginRight:"3px", marginLeft:"3px"}}> 
                    <TableCell></TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={ (e) => {
                       
                          this.state.itemId !==
                          this.props.serviceRequests[index].id
                            ? this.setState({
                                itemId: this.props.serviceRequests[index].id,
                              })
                            : this.setState({ itemId: 100 });

                            this.props.setSpecificEntry(
                              this.props.serviceRequests[index]
                            );
                            
                            this.props.setIndexNumber(
                              this.props.serviceRequests[index].id
                            );

                            

                            

                        
                         
                        } }
                    >
                      {this.props.serviceRequests[index].id ===
                      this.state.itemId ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    <TableCell align="left">
                      {" "}
                      {this.props.serviceRequests[index]?.date}
                    </TableCell>

                    <TableCell align="left">
                      {this.props.serviceRequests[index]?.typeOfService}{" "}
                    </TableCell>
                    <TableCell align="center">
                      {this.props.serviceRequests[index]?.hours}{" "}
                    </TableCell>
                    <TableCell align="center"> {this.props.serviceRequests[index]?.status} </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="noPadding"
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                      onClick={ () => {
                        this.setState({
                            itemId: this.props.serviceRequests[index].id,
                          })
                        }
                      }
                      // onClick={() =>
                      //   this.setState({
                      //     itemId: this.props.serviceRequests[index].id,
                      //   })
                      // }
                    >
                      <Collapse
                        in={
                          this.props.serviceRequests[index].id ===
                          this.state.itemId
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box style={{ padding: "5px" }} margin={1}>
                          <Box className="editIcon">
                            <h5 style={{ marginRight: "auto" }}>Details</h5>
                            <Link to="/editservice">
                              <EditIcon style={{ marginRight: "10px" }} />
                            </Link>
                            <DeleteIcon
                              onClick={() => {
                                this.deleteEntryAsync2();
                              }}
                            />
                          </Box>

                          <p style={{ padding: "15px" }}>
                            {this.props.serviceRequests[index]?.description}
                          </p>
                        </Box>
                      </Collapse>
                    </TableCell>
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
