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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Link
 } from "react-router-dom";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
 
  description: string,
  serviceType: string,
  hours: number,
  status: string
) {
  return {
  
    description,
    serviceType,
    hours,
    status
  };
}

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   price: number
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     price,
//     history: [
//       { date: "2020-01-05", customerId: "11091700", amount: 3 },
//       { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
//     ],
//   };
// }

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();


  return (
    <React.Fragment >
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {/* {row.name} */}
          {/* {row.serviceType} */}
          {/* {this.props.serviceRequests[0].typeOfService} */}
          ServiceTypeTest
        </TableCell>
        <TableCell align="center">
          {/* {row.hours} */}
          HoursTest
          </TableCell>
        <TableCell align="center">
          {/* {row.status} */}
          StatusTest
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box style={{ padding: "5px" }} margin={1}>
          
              <Box className="editIcon"><h5 style={{marginRight:"auto"}}>Details</h5>
              <Link to="/editservice"><EditIcon style={{marginRight:"10px"}}  /></Link><DeleteIcon  /></Box>
              <p style={{ padding: "15px" }}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                vitae ipsa natus laboriosam et odio deleniti.
              </p>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Tutoring", "description", 6.0, "approved"),
  createData("Babysitting","description", 9.0, "approved"),
  createData("Letter of Support", "description", 16.0, "approved"),
  createData("Animal Shelter", "description", 3.7, "approved"),
  createData("Recycling", "description", 16.0, "approved"),
];

type AcceptedProps = {
  sessionToken?: any; 
  serviceRequests: any;
  setServiceRequests: (e: any) => void;
};

export default class Chart extends React.Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }
 
  componentDidMount(){
    this.fetchServiceRequests();
    console.log(this.props.serviceRequests)

  }
  fetchServiceRequests = () =>{
    fetch('http://localhost:4000/service', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
        })
    }).then((res=> res.json()))
    .then((json) => {
        console.log(json)
        this.props.setServiceRequests(json) //taking information from the server and setting it to our state
        console.log(this.props.serviceRequests)
        
    })
  }
  
  

  render() {
  return (
    <TableContainer style={{paddingLeft:"5px"}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Service Type</TableCell>
            <TableCell align="center">Hours</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
          {rows.map((row) => (
            <Row key={row.serviceType} row={row} />
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}}
