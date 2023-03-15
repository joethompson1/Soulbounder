// const Meme = artifacts.require("Meme");
const Soulbounder = artifacts.require("Soulbounder");

module.exports = function(deployer) {
	deployer.deploy(Soulbounder);
	// deployer.deploy(Meme);
};