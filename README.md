
<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="https://github.com/joethompson1/Soulbounder/blob/main/Website/public/images/logos/SB%20purple%2Bblue%2Bgradient.svg" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">Soulbounder</h3>

  <p align="center">
    An in the works Soulbound token (SBT) provider using the Ethereum blockchain as a store and proof of transactions.
    <br />
    <br />
    <a href="https://joethompson.co.uk/projects"><strong>- View Portfolio Overview</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![product-screenshot][product-screenshot]](https://joethompson.co.uk/soulbounder)


### Description:
This project is currently still under development.

In 2022 Vitalik Buterin Co-authored a whitepaper called Decentralized Society: Finding Web3's Soul. Whereby he outlined his idea of introducing SoulBound Tokens (SBTs) to bring about a more decentralised society through the use of the blockchain. This is achieved through the use of a one time transfer token known as an SBT.

Working with this idea I am currently developing a website that would allow people to create and issue their own SBTs. These can come in a variety of different forms such as, proof of attendance, certificates and general ID's. This builds upon the work I did for my Datachain project, this time creating a more general purpose certificate which will be hosted on the Ethereum blockchain and utilising the cutting edge Soulbound Token smart contract, which is currently being developed by the Ethereum Foundation.

The premise of the project is to leverage blockchain technology as a way of improving the efficiency of every day life. One of the ways we are already seeing this is with the increase in utility of digital wallets. Soulbounder strives at providing an easy way of creating and sharing SBT's by bridging the gap between blockchain technology and the every day user. This will open up a whole world of potential possibilities for users wanting to add more functionality to digital wallets.




<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

The technologies I used to build this project are listed below:

* [![JQuery][JQuery.com]][JQuery-url]
* [![Node.JS][NodeJS]][NodeJS-url]
* [![NPM][NPM]][NPM-url]
* [![Ether][Ethereum]][Ethereum-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

If you wish to set up the project locally then follow these simple steps below.

### Prerequisites
If the following are already installed on your machine then you can skip this step.
If you don't have them installed then copy and paste the necessary lines below into the terminal.


#### Clone the repo
* Clone the datachain repository
   ```sh
   git clone https://github.com/joethompson1/Soulbounder.git
   ```

#### NPM
* Install npm
  ```sh
  npm install -g npm
  ```


#### Truffle
* Download and Install Truffle globally by copying the following command into terminal
  ```sh
  npm install -g truffle
  ```


#### Ganache
* Download and Install Ganache from the following
  ```url
  https://trufflesuite.com/ganache/
  ```


#### Metamask
* Download and Install the Metamask wallet extension from the following
  ```url
  https://metamask.io/download/
  ```



<br></br>
### Compile and Deploy the Smart Contract
Files are built to Website/builtContracts.

1. Go to the Truffle folder
   ```sh
   cd Soulbounder/Truffle
   ```
2. Install the OpenZeppelin contracts by pasting the following command into terminal inside the Truffle folder
   ```sh
   npm install
   ```
3. Enter command to tell truffle to compile the contracts
   ```sh
   truffle compile
   ```
3. Make sure Ganache is open (can set up new environment using quickstart)

4. Deploy the smart contract to the blockchain
   ```sh
   truffle migrate --reset
   ```
* (If you wish to use interect with the smart contract through the truffle console) Command to bring up the truffle console
   ```sh
   truffle console
   ```
* Once in the console you can interact with the functions of the smart contract, for example:
   ```js
   const soulbounder = await Soulbounder.deployed()
   ```
   ```js
   soulbounder
   ```
   ```js
   soulbounder.safeMint('<ReceiverWallet>', '<TOKENURI>')
   ```

<br></br>

### Installation and Set Up of Front End

Follow the steps below to set up and start the project locally:


1. Go to the website folder
   ```sh
   cd Soulbounder/Website/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run devStart
   ```



### Connect MetaMask to Ganache

Follow the steps below to set up MetaMask so that it connects to your Ganache wallet:


1. In MetaMask add a new network with the following details:
  Network Name:
   ```
   Ganache
   ```
   New RPC URL:
   ```
   HTTP://127.0.0.1:7545
   ```
   Chain ID:
   ```
   1337
   ```
2. Import your 1st Ganache wallet into MetaMask by copying the wallets private key from Ganache and pasting it into MetaMask import account page

3. In metamask make sure you have Ganache selected as your network and you are using the account of the wallet you have just imported.










<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- CONTACT -->
## Contact

Joe Thompson 

Email: joe.cl.thompson@gmail.com

Github Link: [https://github.com/joethompson1/Datachain](https://github.com/joethompson1/Soulbounder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: Website/public/images/logo/LogoDesigns/soulbounderCreateSBT.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Hyperledger]: https://img.shields.io/badge/Hyperledger_Fabric-FF0000?style=for-the-badge&logo=Hyperledger&logoColor=black
[Hyperledger-url]: https://www.hyperledger.org/use/fabric/
[NodeJS]: https://img.shields.io/badge/Node.JS-BAB86C?style=for-the-badge&logo=Node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MongoDB]: https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[NPM]: https://img.shields.io/badge/NPM-d90166?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[Ethereum]: https://img.shields.io/badge/Ethereum-5A5A5A?style=for-the-badge&logo=Ethereum&logoColor=white
[Ethereum-url]: https://www.ethereum.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 