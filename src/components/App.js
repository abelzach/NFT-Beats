import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import NFTbeats from '../build/NFTbeats.json'

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

    
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h1>NFT-Beats</h1>
        </nav>
      </div>
    );
  }
}

export default App;
