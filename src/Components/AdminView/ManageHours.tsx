import React from "react";

//DYNAMIC URL (LOCAL HOST VS HEROKU )
import API_URL from "../../environment";

//Material UI
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

//FONT AWESOME ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

// PROP TYPES
type AcceptedProps = {
  classCode?: number;
  sessionToken?: any;
  setIsAdminTrue: (e: any) => void;
};

// STATE TYPES
type myState = {
  open: boolean;
  statusView: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  setOpen: (e: any) => void;
};

export default class ManageHoursTable extends React.Component<
  AcceptedProps,
  myState
> {
  //Sets inital values of all state variables
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      statusView: "Pending",
      serviceRequests: [],
      setServiceRequests: (e) => {
        this.setState({ serviceRequests: e });
      },
      open: false,
      setOpen: (e) => {
        this.setState({ open: e });
      },
    };
  }

  //This LifeCycle Method run when the component first loads
  //Fetches data & ensures that we stay on Admin View if page refreshes
  componentDidMount() {
    this.fetchServiceRequests("Pending");
    this.props.setIsAdminTrue(true);
  }

  //When the GREEN button is clicked, the status of the service entry changes to APPROVED
  //This request then triggers another fetch to update the DOM to only show results with PENDING status
  handleSubmit = (id: number) => {
    fetch(`${API_URL}/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "Approved",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");

        this.fetchServiceRequests("Pending");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  //When the RED button is clicked the service entry status changes to DENIED
  //This request then triggers another fetch to update the DOM to only show results with PENDING status
  handleSubmit2 = (id: number) => {
    fetch(`${API_URL}/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "Denied",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");
        this.fetchServiceRequests("Pending");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  //When the YELLOW button is clicked, the service entry status changes to PENDING
  // Afterwards a fetch request runs--- Conditional rendering based on CURRENT status of entry

  handleSubmit3 = (id: number, currentStatus: string) => {
    fetch(`${API_URL}/service/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        service: {
          status: "Pending",
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Service status update submission was successful");

        currentStatus === "Approved"
          ? this.fetchServiceRequests("Approved")
          : this.fetchServiceRequests("Denied");
      } else {
        console.log("Service status update submission failed");
      }
      return response.json();
    });
  };

  //This GET request is linked to the dropdown menu where users select by current status (APPROVED, DENIED, PENDING)
  //The default view is PENDING, but if a different item is chosen on dropdown list the fetch url changes to show that status
  //This fetch collects the data that will be shown on the DOM
  fetchServiceRequests = (e: any) => {
    let url: any;
    if (e !== undefined) {
      url = `${API_URL}/service/${e}`;
    } else {
      url = `${API_URL}/service/Pending`;
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
        this.state.setServiceRequests(json);
      });
  };

  render() {
    return (
      <TableContainer className="manageHoursMarginTop">
        <Box
          style={{
            color: "black",
            padding: "0px",
            margin: "10px",
          }}
        >
          <Box style={{ marginTop: "0px" }}>
            <Typography
              className="adminTitle"
              component="h2"
              variant="h5"
              style={{
                textAlign: "center",
                marginBottom: "5px",
                color: "black",
              }}
            >
              Manage Hours
            </Typography>
            <Box
              className="studentChart"
              style={{ paddingTop: "10px", textAlign: "center" }}
            >
              <FormControl style={{ width: "200px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={"Pending"}
                  onChange={(e) => {
                    this.fetchServiceRequests(e.target.value);
                    this.setState({ statusView: e.target.value });
                  }}
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Denied"}>Denied</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Table style={{ marginLeft: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell></TableCell>
              <TableCell align="left"> </TableCell>
              <TableCell align="left">Description</TableCell>

              <TableCell align="center">Update Status</TableCell>
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

                    <TableCell></TableCell>

                    <TableCell
                      align="left"
                      style={{ fontSize: "11px", width: "100px" }}
                    >
                      {this.state.serviceRequests[index]?.hours}
                      {" hour(s) "} <br></br> {"on "}
                      {this.state.serviceRequests[index]?.date} <br></br>
                      <br></br>
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      {" "}
                      <h4 style={{ marginRight: "0px" }}>
                        {
                          this.state.serviceRequests[index]?.studentUser
                            .firstName
                        }{" "}
                        {
                          this.state.serviceRequests[index]?.studentUser
                            .lastName
                        }
                        {""}{" "}
                      </h4>{" "}
                      {this.state.serviceRequests[index]?.description}
                    </TableCell>
                    {this.state.statusView === "Pending" ? (
                      <TableCell align="center" className="tableWidth">
                        <Button
                          className="buttonMargin greenButton"
                          variant="contained"
                          onClick={() => {
                            this.handleSubmit(
                              this.state.serviceRequests[index]?.id
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            style={{
                              fontSize: "20px",
                            }}
                            icon={faCheckSquare}
                          />
                        </Button>

                        <Button
                          className="buttonMargin redButton"
                          variant="contained"
                          onClick={() => {
                            this.handleSubmit2(
                              this.state.serviceRequests[index]?.id
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            style={{
                              fontSize: "20px",
                            }}
                            icon={faTimesCircle}
                          />
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <Button
                          className="yellowButton"
                          variant="contained"
                          onClick={() => {
                            this.handleSubmit3(
                              this.state.serviceRequests[index]?.id,
                              this.state.statusView
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            style={{
                              fontSize: "15px",
                            }}
                            icon={faUndo}
                          />
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
      </TableContainer>
    );
  }
}
