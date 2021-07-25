import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { ethers } from 'ethers'
import files from '../files.json';

import address from '../address.json';
import ERC20WithPermit from "../../src/contracts/ERC20WithPermit.json"
import Pool from "../../src/contracts/Pool.json"
import EncoderTest from "../../src/contracts/EncoderTest.json"

const abis = {
  // permit
  ERC20WithPermit: ERC20WithPermit.abi,
  Pool: Pool.abi,
  EncoderTest: EncoderTest.abi
}

export default new Vuex.Store({
  state: {
    chainId: null,
    account: null,
    balance: null,

    singer: null,

    // permit
    ERC20WithPermit: address.ERC20WithPermit,
    Pool: address.Pool,

    // encoder test
    EncoderTest: address.EncoderTest,

    solFiles: null,
    jsFiles: null,
    tsFiles: null,
  },
  mutations: {
  },
  actions: {
    async connect ({ state }) {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' })

          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()

          state.chainId = await signer.getChainId()
          state.account = await signer.getAddress()
          state.balance = await signer.getBalance()

          state.signer = signer
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    async contract ({ state }, name) {
      return new ethers.Contract(state[name], abis[name], state.signer)
    },
    get ({ state }) {
      state.solFiles = files.sol;
      state.jsFiles = files.js;
      state.tsFiles = files.ts;
    }
  },
})
