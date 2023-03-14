const Meme = artifacts.require("Meme");
const Soulbound = artifacts.require("Soulbound");

module.exports = function(deployer) {
	deployer.deploy(Meme);
	deployer.deploy(Soulbound);
};