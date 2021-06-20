require('dotenv').config()
require("@nomiclabs/hardhat-ethers");

const PK = process.env.PK;

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: 'https://rinkeby.rpc.tokamak.network',
      accounts: [`0x${PK}`],
    },
  },
};
