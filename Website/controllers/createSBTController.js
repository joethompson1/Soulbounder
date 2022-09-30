import * as IPFS from 'ipfs-core';


// controller actions
export const createSBT_get = async (req, res) => {
	res.status(200).render('createSBT/createSBT');
};


export const createSBT_post = async (req, res) => {
	try {
		const node = await IPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol:'https' });

		let { SBTName, SBTPicture, SBTDescription, SBTCity, SBTCountry, SBTStartDate, SBTEndDate, SBTWebsite }  = req.body;

		console.log(SBTPicture);

		const fileAdded = await node.add(SBTName);
		console.log("Added file CID:", fileAdded.cid);



	



	} catch (err) {
		res.status(400).json({ errors: "error in createSBTController" })
	}
}
