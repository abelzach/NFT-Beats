import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Card,
  CardContent,
  CardHeader
} from "@material-ui/core/";


const WhiteTextTypography = withStyles({
  root: {
    color: "darkblue"
  }
})(Typography);

class Register extends Component {

   constructor(props) {
    super(props);
    this.nameinput = React.createRef();
  }  

  render() {
      return(
        <div >         
          <center>
            <br/><br/>
            <h1 style={{color: 'white'}}><strong>NFT-Beats</strong></h1>
            
            <br/><br/>
            <Typography component="h1" variant="h5">
                <h1 style={{color: 'white'}}>Register as New Music Artist/Composer</h1>                    
            </Typography>
            </center>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                
                <div style={{marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Card style={{ padding: "5px", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                  
                  <CardContent>

                    <form onSubmit={(event)=>{
                      event.preventDefault();
                      const name = this.nameinput.current.value
                      this.props.registerArtist(name)
                    }}>
                      <center>
                      <div class="form-group mx-sm-5 mb-2">

                        <br/><br/>
                        <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.nameinput} placeholder="Enter your Name"/>
                      </div>
                      <br/>

                      <button type="submit" class="btn btn-info mb-3">Register</button>
                      </center>
                    </form>
                  </CardContent>
                </Card>
                
                </div>

            </Container>
        </div>
      );
    }
    }

  export default Register;