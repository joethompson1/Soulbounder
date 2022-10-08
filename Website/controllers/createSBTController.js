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

		let { SBTName, SBTPicture, SBTDescription, SBTCity, SBTCountry, SBTStartDate, SBTEndDate, SBTWebsite }  = req.body;

		const buffer = Buffer.from(SBTPicture, 'base64');
		console.log('myBuffer: ', buffer);

		const pictureAdded = await node.add(buffer);
		console.log("Added file CID:", pictureAdded);

		const SBTData = { "SBT Name" : SBTName,
						  "SBT Picture" : "https://ipfs.io/ipfs/"+pictureAdded.path,
						  "SBT Description" : SBTDescription,
						  "SBT City" : SBTCity,
						  "SBT Country" : SBTCountry,
						  "SBT Start Date" : SBTStartDate,
						  "SBT End Date" : SBTEndDate,
						  "SBT Website" : SBTWebsite };

		console.log(JSON.stringify(SBTData));

		const dataAdded = await node.add(JSON.stringify(SBTData));
		console.log("Added file CID:", dataAdded);




	} catch (err) {
		res.status(400).json({ errors: "error in createSBTController" })
	}
}

