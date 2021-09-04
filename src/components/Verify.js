import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            found: "Search"
        }
    }

    async updateSearch(event) {
        this.setState({search: event.target.value.substr(0,20)});
        let res = await this.props.verifyCreator(this.state.search);
        this.setState({ found: res });
    }  

    render() {        
        return (
            <React.Fragment>
                <br></br>
                <h1 style={{textAlign: "center", color: "white", fontSize:"70px"}}>NFT-Beats</h1>
                <br/><br/><br/>
                <h2 style={{textAlign: "center", color: "white", fontSize:"45px"}}>Verify Certificates</h2>
                <br/><br/><br/><br/>
                <center>
                <div style={{ width: 1000 }}>
                    <input type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Enter NFT ID to search" />
                    <br/><br/>
                    <Alert variant="primary">
                        <h4 style={{color: "black", fontSize:"30px"}}>{this.state.found}</h4>
                    </Alert>
                    </div>
                </center>
                <br/>                        
            </React.Fragment>
        );
    }
}

export default Verify;