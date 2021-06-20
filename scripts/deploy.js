require('dotenv').config()

const fs = require('fs');
const path = require('path');

const { ethers } = require('hardhat');

const contracts = [
  // permit
  'ERC20WithPermit',
  'Pool'
]

async function main() {
  const address = {
    ERC20WithPermit: '',
    Pool: '',
  }

  // permit
  if (!process.env.ERC20WithPermit || !process.env.Pool) {
    const ERC20WithPermit = await ethers.getContractFactory('ERC20WithPermit')
    const erc20WithPermit = await ERC20WithPermit.deploy('SGNOO TEST TOKEN', 'STT')
    address.ERC20WithPermit = erc20WithPermit.address;
    console.log('permit/ERC20WithPermit:', erc20WithPermit.address)

    const Pool = await ethers.getContractFactory('Pool')
    const pool = await Pool.deploy(erc20WithPermit.address)
    address.Pool = pool.address;
    console.log('permit/Pool:', pool.address)
  }

  contracts.forEach(contract => {
    fs.copyFileSync(
      path.join(__dirname, "../artifacts/contracts/" + contract + ".sol/" + contract + ".json"), //source
      path.join(__dirname, "../app/src/contracts/" + contract + ".json") // destination
    );
  })

  contracts.forEach(contract => {
    address[contract] = process.env[contract] || address[contract];
  });
  fs.writeFileSync(path.join(__dirname, "../app/src/address.json"), JSON.stringify(address))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
