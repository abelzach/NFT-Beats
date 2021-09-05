# NFT-Beats
A Decentralized platform for music artists and composers to tokenize their audio tracks and songs as NFTs and also auction/sell them.

![logo](/src/logo.png?raw=true)


#### [Smart Contract deployed on Celo Alfajores Testnet](https://alfajores-blockscout.celo-testnet.org/address/0x33d5C607a561a40756590b4a11dCC7fBfF235018)

<br/>

The NFT-Beats decentralized application is built using Celo, IPFS and Filecoin. New users can register on the DApp by providing their name/pseudonym, and this is stored on the blockchain along with their corresponding address. Once registered, the artists can upload their content and mint NFTs corresponding to it. This assigns a unique ownership to the content, the record of which is stored on the blockchain. The off-chain data of these NFTs are stored in a decentralized manner on IPFS and Filecoin, via NFT.Storage. Since the querying of data is done based on the actual content, it is hence possible to identify and prevent duplication of content and catch fraud. This also makes it possible for people to verify if the work is from the original artist, by checking which address the track/song NFT was minted from. Similarly music artists can claim that they are the original creator of any particular track, by virtue of the ownership verification feature in the DApp. The DApp also allows artists to list their NFTs for sale/auction at a price that they prefer. Public users of the DApp can then placed bids and buy these NFTs by paying the amount in CELO. This will be helpful for artists to generate additional revenue, without the need for intermediaries or paying third party fees. 

<br/>

## Steps to Run NFT-Beats DApp

### Install Requirements

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
