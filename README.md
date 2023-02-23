<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="https://github.com/joethompson1/Soulbounder/blob/main/LogoDesigns/SB%20purple%2Bblue%2Bgradient.svg" alt="Logo" width="180" height="180">
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

[![product-screenshot][product-screenshot]](https://joethompson.co.uk/projects)


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
   git clone https://github.com/joethompson1/joethompson.git
   ```

#### NPM
* Install npm
  ```sh
  npm install -g npm
  ```


#### Homebrew
* Install homebrew
  ```sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```


#### Go
* Install go
  ```sh
  brew install go
  ```


#### cURL
* Install the latest version of cURL if it is not already installed.
  ```sh
  brew install curl
  ```



#### Docker
* Install the latest version of Docker Desktop if it is not already installed. Since Docker Desktop is a UI application on Mac, use cask to install it.
  ```sh
  brew install --cask --appdir="/Applications" docker
  ```
* Docker Desktop must be launched to complete the installation so be sure to open the application after installing it:
  ```sh
  open /Applications/Docker.app
  ```


#### JQ
* Install the latest version of jq if it is not already installed.
  ```sh
  brew install jq
  ```


#### Download Fabric samples, Docker images, and binaries
* Create a new folder named fabricSamples, seperate to the project and cd into it
  ```sh
  mkdir fabricSamples
  cd fabricSamples/
  ```
* Download the fabric install script into the new folder you created
  ```sh
  curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
  ```
* Install fabric
  ```sh
  ./install-fabric.sh
  ```


<br></br>


### Installation and Set Up of Hyperledger Fabric Blockchain

Follow the steps below to set up and start the Hyperledger Fabric blockchain network locally:


1. Start docker
2. Copy the following folders from fabricSamples:
   ```sh
   bin
   ```
   ```sh
   ci
   ```
   ```sh
   config
   ```
   ```sh
   test-network
   ```
   ```sh
   scripts
   ```
   ```sh
   test-application
   ```
   and paste them into the project root (replacing the folders already there).

4. Go into test-network/
   ```sh
   cd test-network/
   ```
5. Bring up the Hyperledger network and create a channel called mychannel
   ``` sh
   ./network.sh up createChannel -c mychannel -ca
   ```
6. Deploy the chaincode/smart contract to the newly created channel
   ``` sh
   ./network.sh deployCC -ccn basic -ccp ../dataChain/chaincode-go/chaincode/ -ccl go
   ```
<br></br>


### Installation and Set Up of Front End

Follow the steps below to set up and start the project locally:


1. Go into dataChain/application-datachain/
   ```sh
   cd dataChain/application-datachain/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create new file called `config.js`

4. Enter your MongoDB API key in `config.js` remember to include `/datachain?retryWrites=true&w=majority` at the end of the URI
   ```js
   const mongoDBURI = 'ENTER YOUR API';
   // Should look something like below
   const mongoDBURI = 'mongodb+srv://<ACCOUNT NAME>:<PASSWORD>@<cluster>/datachain?retryWrites=true&w=majority';
   ```
5. Start the development server
   ```sh
   npm run devStart
   ```
6. Open the website locally in your browser
   ```
   http://localhost:3000/
   ```



<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Joe Thompson 

Email: joe.cl.thompson@gmail.com

Github Link: [https://github.com/joethompson1/Datachain](https://github.com/joethompson1/Datachain)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: LogoDesigns/soulbounderCreateSBT.png
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
[Ethereum]: https://img.shields.io/badge/Ethereum-5A5A5A?style=for-the-badge&logo=npm&logoColor=white
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