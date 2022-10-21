import * as IPFS from 'ipfs-core';


const ifpsConfig = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
};


// controller actions
export const createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};


export const createSBT_post = async (req, res) => {
	try {

		const node = await IPFS.create(ifpsConfig);

		const buffer = Buffer.from(req.body.SBTPicture, 'base64');
		console.log('myBuffer: ', buffer);

		const pictureAdded = await node.add(buffer);
		console.log("Added file CID:", pictureAdded);

		const SBTData = { "SBT Name" : req.body.SBTName,
						  "SBT Picture" : "https://ipfs.io/ipfs/"+pictureAdded.path,
						  "SBT Description" : req.body.SBTDescription,
						  "SBT City" : req.body.SBTCity,
						  "SBT Country" : req.body.SBTCountry,
						  "SBT Start Date" : req.body.SBTStartDate,
						  "SBT End Date" : req.body.SBTEndDate,
						  "SBT Website" : req.body.SBTWebsite };

		console.log(JSON.stringify(SBTData));

		const dataAdded = await node.add(JSON.stringify(SBTData));
		console.log("Added file CID:", dataAdded);
		const path = dataAdded.path.toString();

		res.status(200).render('createSBT/blockchain', { path: path });


	} catch (err) {
		res.status(400).json({ errors: "error in createSBTController" })
	}
}



