import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Falcon from "../../Assets/FC_Mascot_update.png";



class HomeSitebar extends React.Component {
  render() {
    return (
      <div className="mainDiv">
        <AppBar position="static">
          <Toolbar className="homeSite">
           
            <Typography  variant="h5" noWrap>
              National Junior Honor Society
            </Typography>
       
        
      
          </Toolbar>
        
        </AppBar>
        
         <div className="falconpic">   <img src={Falcon} style={{width: '10em', backgroundColor: 'white', borderRadius: "30%"}}></img></div>
     
       
      </div>
    );
  }
}

export default HomeSitebar;
