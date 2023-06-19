import * as IPFS from 'ipfs-http-client';
import axios from 'axios';
import { Soulbounder_API_KEY, Soulbounder_API_SECRET_KEY } from '../env.js';


const apiKey = Soulbounder_API_KEY;
const apiKeySecret = Soulbounder_API_SECRET_KEY;
const auth = "Basic " + btoa(apiKey + ":" + apiKeySecret);


const ipfsConfig = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
};


const initIpfs = async () => {
  if (!apiKey || !apiKeySecret) {
    throw new Error("Infura API keys missing.")
  }
  const ipfs = await IPFS.create(ipfsConfig);
  console.log("IPFS node is ready");

  return ipfs;
};




const addFileToIPFS = async (file, ipfs) => {
  console.log("Adding file to IPFS....");
  console.log("projectId: ", apiKey);
  console.log("projectSecret: ", apiKeySecret);
  const fileAdded = await ipfs.add({ content: file });
  return fileAdded;
};


const unpinFileFromIPFS = async (cid) => {

  try {

      const url = `${apiUrl}/pin/rm?arg=${cid}`;
      const auth = {
          username: apiKey,
          password: apiKeySecret
      };

      const response = await axios.post(url, null, { auth });

      if (response.status === 200) {
          console.log('File successfully unpinned from IPFS');

      } else {
          console.error('Error removing pin:', response.data);

      }
  
  } catch (error) {

      console.error('Error removing pin:', error.message);
  
  }
}



export { initIpfs, addFileToIPFS, unpinFileFromIPFS };