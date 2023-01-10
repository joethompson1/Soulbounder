
// Installation of openzeppelin npm packages
npm install @openzeppelin/contracts


// Installation of hdwallet-provider
npm install --save-dev @truffle/hdwallet-provider







// To bring up truffle console:
npx truffle console --network <networkName>


// To list all wallet addresses
let accounts = await web3.eth.getAccounts()


// To get Balance of wallet
await web3.eth.getBalance('<WalletAddress>')


// Create contract instance
let instanceName = await <ContractName>.deployed()

