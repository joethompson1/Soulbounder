import * as IPFS from 'ipfs-http-client';


const projectId = process.env.Soulbounder_API_KEY;
const projectSecret = process.env.Soulbounder_API_SECRET_KEY;
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
  const ipfs = await IPFS.create(ipfsConfig);
  console.log("IPFS node is ready");

  return ipfs;
};




const addFileToIPFS = async (file, ipfs) => {
  console.log("Adding file to IPFS....");
  console.log("projectId: ", projectId);
  console.log("projectSecret: ", projectSecret);
  const fileAdded = await ipfs.add({ content: file.toString() });
  return fileAdded;
};



export { initIpfs, addFileToIPFS };