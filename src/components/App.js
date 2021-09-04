import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SpringSpinner } from 'react-epic-spinners';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import Register from './Register';
import Tracks from './Tracks';
import Verify from './Verify';
import NFTbeats from '../build/NFTbeats.json';
import './App.css';
import Mytracks from './Mytracks';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.celo) {
      await window.celo.enable();
      window.web3 = new Web3(window.celo);
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Use the Celo Extension Wallet!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = NFTbeats.networks[networkId];

    if (networkData) {
      const nftb = new web3.eth.Contract(NFTbeats.abi, networkData.address);
      this.setState({ nftb });
      const tCount = await nftb.methods.tCount.call();
      for (let i = 1; i <= tCount; i++) {
        const track = await nftb.methods.tracks(i).call();
        this.setState({
          tracks: [...this.state.tracks, track]
        });
        if (track.owner == this.state.account) {
          this.setState({
            mytracks: [...this.state.mytracks, track]
          });  
        }
      }

      const oCount = await nftb.methods.oCount.call();
      for (let j = 1; j <= oCount; j++) {
        const offer = await nftb.methods.offers(j).call();
        if (offer.auctioneer === this.state.account) {
          this.setState({
            receivedOffers: [...this.state.receivedOffers, offer]
          });
        }
        else if (offer.bidder === this.state.account) {
          this.setState({
            placedOffers: [...this.state.placedOffers, offer]
          });
        }
      }
       this.setState({ loading: false });
    } else {
      window.alert('Contract could not be deployed.');
    }
  }

  createTrack(name, filecid) {
    this.setState({ loading: true });
    this.state.nftb.methods.createTrack(name, filecid).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }
  
  registerArtist(name) {
    this.setState({ loading: true });
    this.state.nftb.methods.registerArtist(name).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }

  async verifyCreator(id) {
    this.setState({ loading: true });
    const res = await this.state.nftb.methods.verifyCreator(id).call();
    this.setState({ loading: false });
    if (res[0] == "Address not recognized") {
      return "The creator of this track could not be verified";
    } else {
      return "Artist/Composer: "+res[0]+"  Address: "+res[1];
    }
  }

  setPrice(id, price) {
    this.setState({ loading: true });
    this.state.nftb.methods.setPrice(id, window.web3.utils.toWei(price.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }

  makeOffer(id, amount) {
    this.setState({ loading: true });
    this.state.nftb.methods.makeOffer(id, window.web3.utils.toWei(amount.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }

  approveOffer(id) {
    this.setState({ loading: true });
    this.state.nftb.methods.approveOffer(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }

  buyTrack(id) {
    this.setState({ loading: true });
    this.state.nftb.methods.buyTrack(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false });
      window.location.reload();
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      nftb: null,
      tracks: [],
      mytracks: [],
      placedOffers: [],
      receivedOffers: [],
      loading: false
    }

    this.registerArtist = this.registerArtist.bind(this);
    this.verifyCreator = this.verifyCreator.bind(this);
    this.createTrack = this.createTrack.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.makeOffer = this.makeOffer.bind(this);
    this.approveOffer = this.approveOffer.bind(this);
    this.buyTrack = this.buyTrack.bind(this);
  }

  render() {
    return (
      <div style={{ height: 800 }}>
        <Router>
          <Navbar />

          <Route exact path="/" render={props => (
              <React.Fragment>
                {
                <Home />
                }
              </React.Fragment>
          )} />  

          <Route exact path="/register" render={props => (
            <React.Fragment>
              {
                this.state.loading
                ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                : <Register registerArtist={this.registerArtist} />
              }
            </React.Fragment>
          )} />  

          <Route exact path="/create" render={props => (
            <React.Fragment>
              {
                this.state.loading
                ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                : <Create createTrack={this.createTrack} />
              }
            </React.Fragment>
          )} />    

          <Route exact path="/alltracks" render={props => (
            <React.Fragment>
              {
                this.state.loading
                ? <div class="center"><SpringSpinner size="100" color="white" /></div>
               :<Tracks tracks={this.state.tracks} />
              }
            </React.Fragment>
          )} />  

          <Route exact path="/mytracks" render={props => (
            <React.Fragment>
              {
                this.state.loading
                ? <div class="center"><SpringSpinner size="100" color="white" /></div>
                :<Mytracks mytracks={this.state.mytracks} setPrice={this.setPrice} />
              }
            </React.Fragment>
          )} />

          <Route exact path="/verify" render={props => (
            <React.Fragment>
              {
               
                <Verify verifyCreator={this.verifyCreator} />
              }
            </React.Fragment>
          )} />  

          <Route exact path="/offersP" render={props => (
            <React.Fragment>
              {
              }
            </React.Fragment>
          )} />            
        </Router>        
      </div>
    );
  }
}

export default App;
