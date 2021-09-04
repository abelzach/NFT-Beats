require('babel-register');
require('babel-polyfill');
const fs = require('fs');

const Kit = require('@celo/contractkit')
const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')
const getAccount = require('./getAccount').getAccount

async function awaitWrapper() {
  let account = await getAccount()
  kit.connection.addAccount(account.privateKey)
}
awaitWrapper() 


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider, 
      network_id: 44787 
    }
  },

  contracts_build_directory: './src/build/',
  compilers: {
    solc: {
      version: "0.7.1",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}