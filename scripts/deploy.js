require('dotenv').config()

const fs = require('fs');
const path = require('path');

const { ethers } = require('hardhat');
const BigNumber = ethers.BigNumber

const contracts = [
  // permit
  'ERC20WithPermit',
  'Pool',

  'ERC165',
  'EncoderTest',
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

  // ERC165
  if (!process.env.ERC165) {
    const ERC165 = await ethers.getContractFactory('ERC165')
    const erc165 = await ERC165.deploy()
    console.log(`ERC165=${erc165.address}`)
  }

  if (!process.env.EncoderTest) {
    const sourceToken = '0x312c064982dd146681E14a780EF8A74655047fc4'
    const rate = BigNumber.from('100')
    const startTime = BigNumber.from('200')
    const stepEndTimes = [BigNumber.from('10'), BigNumber.from('20')]
    const stepRatio = [BigNumber.from('30'), BigNumber.from('40')]

    const EncoderTest = await ethers.getContractFactory('EncoderTest')
    const encoderTest = await EncoderTest.deploy(sourceToken, rate, startTime, stepEndTimes, stepRatio)
    console.log(`EncoderTest=${encoderTest.address}`)
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
