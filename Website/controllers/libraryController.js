

// controller actions
export const library_get = async (req, res) => {
	const request = new Request("https://ipfs.io/ipfs/"+req.query.hash);
	const response = await fetch(request);
	const SBTData = await response.json();
	console.log(SBTData);

	// console.log(req.query.hash);

	res.status(200).render('library/viewSBT', { SBTData });
};


