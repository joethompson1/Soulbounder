// migrations/2_deploy.js
// SPDX-License-Identifier: MIT

const UniversityDegree = artifacts.require("UniversityDegree");


module.exports = function(deployer) {
	deployer.deploy(UniversityDegree);
}