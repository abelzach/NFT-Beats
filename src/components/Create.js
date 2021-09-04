import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"; 
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

  onSubmit = async(event) => {
    event.preventDefault()
    if(this.state.fileSelected){       
      const options = {
      headers : {
          "Authorization": `Bearer ${process.env.REACT_APP_NFTKEY}`,
        }
      }
      axios.post("https://api.nft.storage/upload", this.fileinput.current.files[0], options)      
      .then((result)=>{
        this.props.createTrack(this.nameinput.current.value, result.data.value.cid)
        console.log(result.data.value.cid);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      })
    }
  }

  constructor(props) {
    super(props);
    this.fileinput = React.createRef();
    this.nameinput = React.createRef();

    this.state={
      fileSelected: false
    }
  }

  render() {
    return (
      <div>
          <h1>NFT-Beats</h1>
          <center>
        <div style={{width:700, padding: "10px", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: '#00e6e6'}} >
          <div style={{width:600}}>
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
              <div class="mb-3">
                <br/>
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Enter Track Name</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.nameinput} placeholder="Enter a Name for your Track" required />
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="formFile" class="form-label"><h3 style={{ color: "Navy" }}>Choose File (mp3)</h3></label>
                <input type="file" class="form-control" id="formFile" ref={this.fileinput} onChange={(event) =>{
                  event.preventDefault();
                  if(this.fileinput.current.files[0]){
                    this.setState({fileSelected:true})
                  }
                }} />
              </div>
              <br/><br/>

              <button type="submit" class="btn btn-success mb-3">Mint NFT</button>
              <br/><br/>
            </form>
          </div>
        </div>
        </center>
      </div>
    );
  }
}

export default App;
