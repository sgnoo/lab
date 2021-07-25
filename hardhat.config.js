require('dotenv').config()
require("@nomiclabs/hardhat-ethers");

const PK = process.env.PK;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.7.0"
      },
      {
        version: "0.7.5"
      }
    ]
  },
  networks: {
    rinkeby: {
      url: 'https://rinkeby.rpc.tokamak.network',
      accounts: [`0x${PK}`],
    },
  },
};
