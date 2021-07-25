<template>
  <div>
    <button @click="sendLegacyTransaction()">Send Legacy Transaction</button>
    <button @click="sendEIP2930Transaction()">Send EIP-2930 Transaction</button>
    <button @click="sendEIP1559Transaction()">Send EIP-1559 Transaction</button>
  </div>
</template>

<script>
export default {
  methods: {
    async sendLegacyTransaction() {
      const signer = this.$store.state.signer;
      const legacyTxRequest = {
        type: null,
        chainId: await signer.getChainId(),

        to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        from: await signer.getAddress(),
        nonce: await signer.getTransactionCount(),
        data: "0x00",
        value: "0x00",
        gasLimit: 60_000,
        gasPrice: 1_000_000_000, // 1 gwei
      };
      await signer.sendTransaction(legacyTxRequest);
    },
    async sendEIP2930Transaction() {
      const signer = this.$store.state.signer;
      const eip2930TxRequest = {
        type: "0x1",
        chainId: await signer.getChainId(),

        to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        from: await signer.getAddress(),
        nonce: await signer.getTransactionCount(),
        data: "0x00",
        value: "0x00",
        gasLimit: 60_000,
        gasPrice: 1_000_000_000, // 1 gwei
        accessList: [
          [
            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            [
              "0x0000000000000000000000000000000000000000000000000000000000000004",
              "0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d",
            ],
          ],
          [
            "0x5FfC014343cd971B7eb70732021E26C35B744cc4",
            [
              "0x0000000000000000000000000000000000000000000000000000000000000001",
            ],
          ],
        ],
      };
      await signer.sendTransaction(eip2930TxRequest);
    },
    async sendEIP1559Transaction() {
      const signer = this.$store.state.signer;
      const eip1559TxRequest = {
        type: "0x2",
        chainId: await signer.getChainId(),

        to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        from: await signer.getAddress(),
        nonce: await signer.getTransactionCount(),
        data: "0x00",
        value: "0x00",
        gasLimit: 60_000,
        maxFeePerGas: 2_000_000_000, // 2 gwei
        maxPriorityFeePerGas: 500_000_000, // 0.5 gwei
        accessList: [
          [
            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            [
              "0x0000000000000000000000000000000000000000000000000000000000000004",
              "0x0bcad17ecf260d6506c6b97768bdc2acfb6694445d27ffd3f9c1cfbee4a9bd6d",
            ],
          ],
          [
            "0x5FfC014343cd971B7eb70732021E26C35B744cc4",
            [
              "0x0000000000000000000000000000000000000000000000000000000000000001",
            ],
          ],
        ],
      };
      await signer.sendTransaction(eip1559TxRequest);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>