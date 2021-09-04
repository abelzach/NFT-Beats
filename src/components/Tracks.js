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


class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
    }  

    render() {
        const {classes} = this.props;

        let filteredTracks = this.props.track.filter((track) => {
              return track.name.indexOf(this.state.search) !== -1;
            }
        );
    
        return (
          <React.Fragment>
            <br/><br/>          
            <Typography component="h1" variant="h2" align="center" color="Secondary"  gutterBottom>
                <WhiteTextTypography variant="h2"  >
                    View Tracks/Songs
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
                <h2 style={{color: "white"}}>Search for Tracks</h2>
                <br/><br/>
                <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <br/><br/>
                { filteredTracks.map((track, key) => {
                  return(
                    <React.Fragment>
                        <div class="coupon" key={key} >
                        <div className="card-header">
                        <h2 style={{color: "white"}}>{track.name}</h2>
                        <small style={{color: "white"}}></small>
                        </div>
                        <p style={{color: "white"}}>Artist/Composer: {track.aName}</p>
                        <ul id="postList" className="list-group list-group-flush">
                            <li key={key} className="list-group-item py-2">
                            <br></br>
                            <audio controls>
                                <source src={`https://${track.filecid}.ipfs.dweb.link`} type="audio/mp3" />
                            </audio>
                            </li>
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

export default withStyles(useStyles)(Tracks);