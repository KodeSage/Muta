const hre = require("hardhat");

const main = async () => {
	const MutaFactory = await hre.ethers.getContractFactory("Muta");
	const MutaContract = await MutaFactory.deploy();
	await MutaContract.deployed();
	console.log("Contract deployed to:", MutaContract.address); // 0x98b541f962695ee5415499C8400F66C467eCD09e - Address of Muta contract
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();