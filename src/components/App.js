import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import NFTbeats from '../build/NFTbeats.json'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navbar } from 'react-bootstrap';
import Home from './Home'
import Create from './Create'
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.celo) {
      await window.celo.enable()
      window.web3 = new Web3(window.celo)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Use the Celo Extension Wallet!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = NFTbeats.networks[networkId]

    if (networkData) {
      const nftb = new web3.eth.Contract(NFTbeats.abi, networkData.address)
      this.setState({ nftb })
      const tCount = await nftb.methods.tCount.call()
      for (let i = 1; i <= tCount; i++) {
        const track = await nftb.methods.tracks(i).call()
        this.setState({
            tracks: [...this.state.tracks, track]
        })
      }

      const oCount = await nftb.methods.oCount.call()
      for (let j = 1; j <= oCount; j++) {
        const offer = await nftb.methods.offers(j).call()
        if (offer.auctioneer === this.state.account) {
            this.setState({
              receivedOffers: [...this.state.receivedOffers, offer]
            })
          }
          else if (offer.bidder === this.state.account) {
            this.setState({
              placedOffers: [...this.state.placedOffers, offer]
            })
          }
        }
       this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed.')
    }
  }

  createTrack(name, filecid) {
    this.setState({ loading: true })
    this.state.nftb.methods.createTrack(name, filecid).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }
  
  registerArtist(name) {
    this.setState({ loading: true })
    this.state.nftb.methods.registerArtist(name).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  async verifyCreator(id) {
    this.setState({ loading: true })
    const res = await this.state.nftb.methods.verifyCreator(id).call()
    return res
  }

  setPrice(id, price) {
    this.setState({ loading: true })
    this.state.nftb.methods.setPrice(id, window.web3.utils.toWei(price.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  makeOffer(id, amount) {
    this.setState({ loading: true })
    this.state.nftb.methods.makeOffer(id, window.web3.utils.toWei(amount.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  approveOffer(id) {
    this.setState({ loading: true })
    this.state.nftb.methods.approveOffer(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  buyTrack(id) {
    this.setState({ loading: true })
    this.state.nftb.methods.buyTrack(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      nftb: null,
      tracks: [],
      placedOffers: [],
      receivedOffers: [],
      loading: false
    }
    this.registerArtist = this.registerArtist.bind(this)
    this.verifyCreator = this.verifyCreator.bind(this)
    this.createTrack = this.createTrack.bind(this)
    this.setPrice = this.setPrice.bind(this)
    this.makeOffer = this.makeOffer.bind(this)
    this.approveOffer = this.approveOffer.bind(this)
    this.buyTrack = this.buyTrack.bind(this)

  }
  render() {
    return (
      <div>
        <Router>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <h2>NFT Beats</h2>
          </Navbar.Brand>
        </Navbar>
        <Route exact path="/" render={props => (
            <React.Fragment>
              {
               <Home/>
              }
            </React.Fragment>
          )} />    
          <Route exact path="/register" render={props => (
            <React.Fragment>
              {
              }
            </React.Fragment>
          )} />  
          <Route exact path="/create" render={props => (
            <React.Fragment>
              {
                <Create createTrack={this.createTrack}/>
              }
            </React.Fragment>
          )} />    
          <Route exact path="/tracks" render={props => (
            <React.Fragment>
              {
              }
            </React.Fragment>
          )} />  
          <Route exact path="/offersR" render={props => (
            <React.Fragment>
              {
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
