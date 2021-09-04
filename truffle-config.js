require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
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