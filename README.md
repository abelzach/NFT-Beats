# NFT-Beats
A Decentralized platform to tokenize audio tracks and songs and auction/sell them.

![logo](/src/logo.png?raw=true)

<br/>

#### [Smart Contract deployed on Celo Alfajores Testnet](https://alfajores-blockscout.celo-testnet.org/address/0x33d5C607a561a40756590b4a11dCC7fBfF235018)

<br/>

## Steps to Run NFT-Beats DApp

### Install Dependencies

Node JS - [node](https://nodejs.org/en/download/)

Celo Extension Wallet and set network as Alfajores Test Network.

### Clone the repo

```
$ git clone https://github.com/abelzach/NFT-Beats

$ cd NFT-Beats
```

### Install Dependencies

```
$ npm install -g truffle

$ npm install
```

- Create a .secret file in the root directory of the repo and enter your Celo account private key.
- Create a .env file in the root directory and set environment variable.

```
REACT_APP_NFTKEY = 'NFT.Storage API Key'
```

### Deploy Smart contract and Run the DApp

```
$ truffle migrate --network alfajores

$ npm start
```

- Visit localhost:3000 in your browser and connect your Celo extension wallet account.
