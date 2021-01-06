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

// function Row(props: { row: ReturnType<typeof createData> }) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();

//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {/* {row.name} */}
//           {/* {row.serviceType} */}
//           {/* {this.props.serviceRequests[0].typeOfService} */}
//           ServiceTypeTest
//         </TableCell>
//         <TableCell align="center">
//           {/* {row.hours} */}
//           HoursTest
//         </TableCell>
//         <TableCell align="center">
//           {/* {row.status} */}
//           StatusTest
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box style={{ padding: "5px" }} margin={1}>
//               <Box className="editIcon">
//                 <h5 style={{ marginRight: "auto" }}>Details</h5>
//                 <Link to="/editservice">
//                   <EditIcon style={{ marginRight: "10px" }} />
//                 </Link>
//                 <DeleteIcon />
//               </Box>
//               <p style={{ padding: "15px" }}>
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
//                 vitae ipsa natus laboriosam et odio deleniti.
//               </p>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

type AcceptedProps = {
  setIndexNumber:any;
  sessionToken: any;
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
  indexNumber:any;
  setSpecificEntry:(e:any)=>void;
  specificEntry:any;
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
    fetch("http://localhost:4000/service", {
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

  render() {
    return (
      <TableContainer
        style={{ paddingLeft: "15px", paddingRight: "15px" }}
        component={Paper}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
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
            {this.props.serviceRequests.length > 0 ? this.props.serviceRequests.map((service: any, index: any) => (
              <React.Fragment key={this.props.serviceRequests.id}>
                
                <TableRow    >
                  <TableCell></TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={(e) => {
                      this.state.itemId !== this.props.serviceRequests[index].id
                        ? this.setState({
                            itemId: this.props.serviceRequests[index].id,
                          })
                        : this.setState({ itemId: 100 });

                     

                      console.log(this.props.serviceRequests[index]);
                      console.log(this.props.indexNumber);
                      this.props.setIndexNumber(this.props.serviceRequests[index].id);
                      this.props.setSpecificEntry(this.props.serviceRequests[index])
                      console.log(this.props.specificEntry)
                      
                      console.log(this.props.indexNumber);
                    }}
                  >
                    {this.props.serviceRequests[index].id ===
                    this.state.itemId ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                  <TableCell align="left">    {this.props.serviceRequests[index]?.date}</TableCell>
              
                  <TableCell align="left">
                    {this.props.serviceRequests[index]?.typeOfService}{" "}
                  </TableCell>
                  <TableCell align="center">
                    {this.props.serviceRequests[index]?.hours}{" "}
                  </TableCell>
                  <TableCell align="center">Awaiting Approval </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="noPadding"
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                    onClick={() =>
                      this.setState({
                        itemId: this.props.serviceRequests[index].id,
                      })
                    }
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
                          <DeleteIcon />
                        </Box>
                    
                        <p style={{ padding: "15px" }}>
                          
                          {this.props.serviceRequests[index]?.description}
                        </p>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )): <div></div>}
          </TableBody>
        </Table>
       
      </TableContainer>
    );
  }
}
