import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { ethers } from 'ethers'

import address from '../address.json';
import ERC20WithPermit from "../../src/contracts/ERC20WithPermit.json"
import Pool from "../../src/contracts/Pool.json"

const abis = {
  // permit
  ERC20WithPermit: ERC20WithPermit.abi,
  Pool: Pool.abi
}

export default new Vuex.Store({
  state: {
    singer: null,

    // permit
    ERC20WithPermit: address.ERC20WithPermit,
    Pool: address.Pool,
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

          console.log(await signer.getAddress())
          console.log((await signer.getBalance()).toString())
          console.log((await signer.getChainId()).toString())

          state.signer = signer
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    async contract ({ state }, name) {
      return new ethers.Contract(state[name], abis[name], state.signer)
    }
  },
})
