const Soulbounder = artifacts.require("Soulbounder");

module.exports = function(deployer) {
	deployer.deploy(Soulbounder);
};