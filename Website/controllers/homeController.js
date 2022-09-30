// controller actions
const home_get = async (req, res) => {
	res.status(200).render('home/home');
};

export default home_get;


