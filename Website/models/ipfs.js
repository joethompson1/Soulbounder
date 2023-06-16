import * as IPFS from 'ipfs-http-client';
import { Soulbounder_API_KEY, Soulbounder_API_SECRET_KEY } from '../env.js';


const projectId = Soulbounder_API_KEY;
const projectSecret = Soulbounder_API_SECRET_KEY;
const auth = "Basic " + btoa(projectId + ":" + projectSecret);


const ipfsConfig = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
};


const initIpfs = async () => {
  if (!projectId || !projectSecret) {
    throw new Error("Infura API keys missing.")
  }
  const ipfs = await IPFS.create(ipfsConfig);
  console.log("IPFS node is ready");

  return ipfs;
};




const addFileToIPFS = async (file, ipfs) => {
  console.log("Adding file to IPFS....");
  console.log("projectId: ", projectId);
  console.log("projectSecret: ", projectSecret);
  const fileAdded = await ipfs.add({ content: file });
  return fileAdded;
};



export { initIpfs, addFileToIPFS };