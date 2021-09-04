import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";

const useStyles = ({
    root: {
      flexGrow: 1,
      //padding: theme.spacing(2)
    }
});

const WhiteTextTypography = withStyles({
  root: {
    color: "white"
  }
})(Typography);


class Mytracks extends Component {
    
    constructor(props) {
        super(props);
        this.priceinput = React.createRef();
    }

    render() {
        const {classes} = this.props;
    
        return (
          <React.Fragment>
            <br/><br/>          
            <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
                <WhiteTextTypography variant="h2"  >
                    Your Tracks/Songs
                </WhiteTextTypography>
            </Typography>
            <br /><br/>
            <center>
            <div className={classes.root}>
            <Grid
                container
                spacing={10}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                <br/><br/>
                { this.props.mytracks.map((track, key) => {
                  return(
                    <React.Fragment>
                        <div class="coupon" key={key} >
                        <div className="card-header">
                        <h2 style={{color: "cornflowerblue"}}>{track.name}</h2>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                            <li key={key} className="list-group-item py-2">
                            <br></br>
                            <audio controls>
                                <source src={`https://${track.filecid}.ipfs.dweb.link`} type="audio/mp3" />
                            </audio>
                            </li>
                            <br/><br/>
                            { !track.isListed &&
                            <React.Fragment>
                                <small style={{color: "white"}}>Not listed for auction/sale</small>
                                <br/>
                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    const price = this.priceinput.current.value;
                                    this.props.setPrice(track.id, price);
                                }}>
                                    <div class="form-group mx-sm-5 mb-2">                                  
                                        <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Enter a price for auction/sale (CELO)" />
                                    </div>
                                    <br/>
                                    <button type="submit" class="btn btn-info mb-3">List for Sale</button>
                                </form>
                            </React.Fragment>
                            }
                            { track.isListed &&
                            <React.Fragment>
                                <div class="form-group mx-sm-5 mb-2">                                  
                                    <p style={{color: "slateblue"}}>Listed in auction for {window.web3.utils.fromWei(track.price.toString())}} CELO</p>
                                </div>
                            </React.Fragment>
                            }
                        </ul>
                        </div>
                        <p>&nbsp;&nbsp;</p>
                    </React.Fragment>
                  )
                })}

            </Grid>
            </div>
            </center>
        </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Mytracks);