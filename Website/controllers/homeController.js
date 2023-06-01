import Web3 from 'web3';

// controller actions
export const home_get = async (req, res) => {

	res.status(200).render('home/home');
};


