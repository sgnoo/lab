<template>
  <div>
    - EIP-712 allows wallets to display data in signing prompts in a structured
    and readable format. EIP712 is a great step forward for security and
    usability because users will no longer need to sign off on inscrutable
    hexadecimal strings, which is a practice that can be confusing and insecure.
    - An adage in the cryptocurrency space states: don’t trust; verify.
    Reference 1.
    https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26
    2.
    https://github.com/danfinlay/js-eth-personal-sign-examples/blob/master/index.js#L322
    <button @click="sign">sign</button>
  </div>
</template>

<script>
export default {
  methods: {
    async sign() {
      const signer = this.$store.state.signer
      const pool = await this.$store.dispatch("contract", "Pool")
      const erc20WithPermit = await this.$store.dispatch(
        "contract",
        "ERC20WithPermit"
      )

      const account = await signer.getAddress()
      const chainId = await signer.getChainId()

      const EIP712Domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ]
      const domain = {
        name: "SGNOO TEST TOKEN",
        version: "1",
        chainId: chainId,
        verifyingContract: erc20WithPermit.address,
      }

      // try to gather a signature for permission
      const nonce = await erc20WithPermit.nonces(account)
      const amount = 100
      const deadline = 9_999_999_999
      const Permit = [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ]
      const message = {
        owner: account,
        spender: pool.address,
        value: amount,
        nonce: nonce.toNumber(),
        deadline: deadline,
      }

      const data = JSON.stringify({
        types: {
          EIP712Domain,
          Permit,
        },
        domain,
        primaryType: "Permit",
        message,
      })

      window.ethereum.sendAsync(
        {
          method: "eth_signTypedData_v3",
          params: [account, data],
          from: account,
        },
        async (err, result) => {
          if (err) {
            return console.error(err)
          }
          const signature = result.result.substring(2)
          const r = "0x" + signature.substring(0, 64)
          const s = "0x" + signature.substring(64, 128)
          const v = parseInt(signature.substring(128, 130), 16)

          await pool.doSomethingWithPermit(amount, deadline, v, r, s)
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
