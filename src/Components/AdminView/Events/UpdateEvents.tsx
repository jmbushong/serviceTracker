import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
  date:any;
  setDate:(e:any) => void;
  oneEvent:any;
  sessionToken?: any;
  eventInfo: any;
  setOpen2: (e: any) => void;
fetchEvents:any;
  open2: any;
  eventInfoIndex:any;
  title:any;
hours: any;
  setHours: (e: any) => void;
  location: any;
  setLocation: (e: any) => void;
  description: any;
  setTitle: (e: any) => void;
  setDescription: (e: any) => void;
};

type myState = {
  date: any;
  title: any;
  description: any;
  hours: any;
  location: any;
  eventUpdate:boolean;
  setEventUpdate:(e:any)=> void;
  

  setDate: (e: any) => void;
  setTitle: (e: any) => void;
  setDescription: (e: any) => void;
  setHours: (e: any) => void;
  setLocation: (e: any) => void;
};

class UpdateEvent extends React.Component<AcceptedProps, myState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      date: "",
      location: "",
      description: "",
      hours: 0,
      title: "",
      eventUpdate:false,
      setEventUpdate: (e) => {this.setState({eventUpdate: e})},
      setDate: (e) => {this.setState({date: e})},
      setLocation: (e) => {this.setState({location: e})},
      setHours: (e) => {this.setState({hours: e})},
      setDescription: (e) => {this.setState({description: e})},
      setTitle: (e) => {this.setState({title: e})}
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/events/${this.props.oneEvent.id}`, {
      method: "PUT",
      body: JSON.stringify({
        events: {
          date: this.props.date,
          title: this.props.title,
          description: this.props.description,
          hours: this.props.hours,
          location: this.props.location,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Event update submission was successful");
        this.state.setEventUpdate(true);
  
      
        this.props.fetchEvents();
        this.props.setOpen2(false)
 
      } else {
        console.log("Event update submission failed");
      }
      return response.json();
    });
  };

  checkForEventEntry=() => {
    if (this.state.eventUpdate){
      return <Redirect to="/adminEvent"/>
    }
  }

  handleClickClose = () => {
    this.props.setOpen2(false);
  };

  render() {
    return (
      <Dialog open={this.props.open2}>
        <DialogTitle id="form-dialog-title">
          <Typography
            className="adminTitle"
            component="h2"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Update Event
          </Typography>
        </DialogTitle>
        <form onSubmit={this.handleSubmit} noValidate>
        <DialogContent>
         
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <form noValidate>
                  <TextField
                     
                    id="date"
                    label="Date of Service"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      this.props.setDate(e.target.value);
                      console.log(this.state.date)
                    }}
                    defaultValue={this.props.eventInfoIndex.date}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <FormControl style={{ minWidth: 160 }}>
                  <TextField
                      autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title of Event"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                    
                      this.props.setTitle(e.target.value);
                     
                    }}
                    defaultValue={this.props.eventInfoIndex.title}
                  />
                  <TextField
                      autoComplete="off"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Location"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                    
                      this.props.setLocation(e.target.value);
                     
                    }}
                    defaultValue={this.props.eventInfoIndex.location}
                  />
                </FormControl>{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    autoComplete="off"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Event Description"
                  type="text"
                  onChange={(e) => {
              
                    this.props.setDescription(e.target.value);
                   
                  }}
                  defaultValue={this.props.eventInfoIndex.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  style={{
                    minWidth: 160,
                    marginBottom: "25px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Number of Hours
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => {
                 
                      this.props.setHours(e.target.value);
                   
                    }}
                    defaultValue={this.props.eventInfoIndex.hours}
                    //   value={age}
                    //   onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>{" "}
              </Grid>
            </Grid>

            <DialogActions>
              <Button
                onClick={() => {
                  this.handleClickClose();
                }}
              >
                Cancel
              </Button>
             
                <Button
              
                  type="submit"
                >
                  Submit
                </Button>
       
            </DialogActions>
            <Grid container justify="flex-end"></Grid>
     
        </DialogContent> </form>
        {this.checkForEventEntry()}
      </Dialog>
    );
  }
}

export default UpdateEvent;


















// import React, { Component } from "react";

// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";

// import DialogTitle from "@material-ui/core/DialogTitle";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import { Link } from "react-router-dom";
// import FormControl from "@material-ui/core/FormControl";
// import MenuItem from "@material-ui/core/MenuItem";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import { Redirect } from "react-router-dom";

// type AcceptedProps = {
//   eventInfo: any;
//   eventId: any;
//   setOpen2: (e: any) => void;

//   open2: any;
//   sessionToken: any;
//   fetchEvents: any;
//   oneEvent:any;
//   setOneEvent: (e: any) => void;
//   setEventInfo:(e:any) => void;
// };

// type myState = {
//   date: any;
//   title: any;
//   description: any;
//   hours: any;
//   location: any;
//   eventUpdate: boolean;
//   setEventUpdate: (e: any) => void;
//   setDate: (e: any) => void;
//   setTitle: (e: any) => void;
//   setDescription: (e: any) => void;
//   setHours: (e: any) => void;
//   setLocation: (e: any) => void;
// };

// class UpdateEvent extends React.Component<AcceptedProps, myState> {

 

//   constructor(props: AcceptedProps) {
//     super(props);
//     this.state = {
//       date:"",
//       location: "",
//       description: "",
//       hours: 0,
//       title: "",
//       eventUpdate: false,
//       setEventUpdate: (e) => {
//         this.setState({ eventUpdate: e });
//       },
//       setDate: (e) => {
//         this.setState({ date: e });
//       },
//       setLocation: (e) => {
//         this.setState({ location: e });
//       },
//       setHours: (e) => {
//         this.setState({ hours: e });
//       },
//       setDescription: (e) => {
//         this.setState({ description: e });
//       },
//       setTitle: (e) => {
//         this.setState({ title: e });
//       },
//     };
//   }


 

//  handleServiceEvent=()=> fetch(`http://localhost:4000/events/${this.props.oneEvent.id}`, {
//     method: "GET",
//     headers: new Headers({
//       "Content-Type": "application/json",
//       Authorization: this.props.sessionToken,
//     }),
//   })
//     .then((res) => res.json())
//     .then((json) => {
    
//       this.setState({location: json.location});
//       this.setState({hours: json.hours});
//       this.setState({title: json.title});
//       this.state.setDescription(json.description);
//       this.state.setDate(json.date);
//       console.log("It printed");
//       console.log(json);
//     });
 
//     fetchEvents = () => {
//       fetch(`http://localhost:4000/events`, {
//         method: "GET",
//         headers: new Headers({
//           "Content-Type": "application/json",
//           Authorization: this.props.sessionToken,
//         }),
//       })
//         .then((res) => res.json())
//         .then((json) => {
//           console.log(json);
//           this.props.setEventInfo(json);
//           console.log(this.props.eventInfo);
//         });
//     };

//   handleSubmit = (event: any) => {
//     event.preventDefault();
   
   

//     fetch(`http://localhost:4000/events/${this.props.oneEvent.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         // service
//         events: {
//           date: this.state.date,
//           title: this.state.title,
//           description: this.state.description,
//           hours: this.state.hours,
//           location: this.state.location,
//         },
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: this.props.sessionToken,
//       }),
//     }).then((response) => {
//       if (response.status === 200) {
//         console.log("Event Update  was successful");
//         console.log(this.state.title)
//         this.state.setEventUpdate(true);
//         this.props.setOpen2(false);
//         this.fetchEvents()
     
        
      
      
//       } else {
//         console.log("Event update failed");
//       }
//       return response.json();
//     });
//   };

//   checkForEventEntry = () => {
//     if (this.state.eventUpdate) {
//       return <Redirect to="/adminEvent" />;
//     }
//   };

//   handleClickClose = () => {
//     this.props.setOpen2(false);
//   };


//   render() {
//     return (
//       <Dialog open={this.props.open2}>
//         <DialogTitle id="form-dialog-title">
//           <Typography
//             className="adminTitle"
//             component="h2"
//             variant="h5"
//             style={{ textAlign: "center" }}
//           >
//             Update Event
//           </Typography>
//         </DialogTitle>
//         <form onSubmit={this.handleSubmit} noValidate>
//           <DialogContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <form noValidate>
//                   <TextField
//                     id="date"
//                     label="Date of Service"
//                     type="date"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     onChange={(e) => {
//                       this.state.setDate(e.target.value);
//                       console.log(e);
//                     }}
//                     defaultValue={this.props.eventId.date}
//                   />
//                 </form>
//               </Grid>
//               <Grid item xs={12} sm={6}></Grid>
//               <Grid item xs={12}>
//                 <FormControl style={{ minWidth: 160 }}>
//                   <TextField
//                     autoFocus
//                     margin="dense"
//                     id="name"
//                     label="Title of Event"
//                     type="text"
//                     fullWidth
//                     onChange={(e) => {
//                       this.setState({title: e.target.value});
//                       console.log(e.target.value);
//                       console.log(this.state.title)
//                     }}
//                     defaultValue={this.props.eventId.title}
//                   />
//                   <TextField
//                     autoFocus
//                     margin="dense"
//                     id="name"
//                     label="Location"
//                     type="text"
//                     fullWidth
                   
//                     onChange={(e) => {
//                       this.state.setLocation(e.target.value);
//                       console.log(e.target.value);
//                     }}

//                     defaultValue={this.props.eventId.location}
//                   />
//                 </FormControl>{" "}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   variant="outlined"
//                   required
//                   fullWidth
//                   name="password"
//                   label="Event Description"
//                   type="text"
//                   onChange={(e) => {
//                     this.state.setDescription(e.target.value);
//                   }}
//                   defaultValue={this.props.eventId.description}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl
//                   style={{
//                     minWidth: 160,
//                     marginBottom: "25px",
//                   }}
//                 >
//                   <InputLabel id="demo-simple-select-label">
//                     Number of Hours
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
                   
//                     onChange={(e) => {

//                       this.state.setHours(e.target.value);
//                     }}

//                     defaultValue={0}

//                     //   value={age}
//                     //   onChange={handleChange}
//                   >
//                     <MenuItem value={1}>1</MenuItem>
//                     <MenuItem value={2}>2</MenuItem>
//                     <MenuItem value={3}>3</MenuItem>
//                   </Select>
//                 </FormControl>{" "}
//               </Grid>
//             </Grid>

//             <DialogActions>
//               <Button
//                 onClick={() => {
//                   this.handleClickClose();
//                 }}
//               >
//                 Cancel
//               </Button>

//               <Button type="submit">Submit</Button>
//             </DialogActions>
//             <Grid container justify="flex-end"></Grid>
//           </DialogContent>{" "}
//         </form>

//         {this.checkForEventEntry()}
      
//         {console.log(this.props.eventInfo)}
//         {console.log(this.props.oneEvent.id)}
//         {console.log(this.props.oneEvent)}
//         {console.log(this.state.hours)}
        
//       </Dialog>
//     );
//   }
// }

// export default UpdateEvent;
