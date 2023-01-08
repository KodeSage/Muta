const hre = require("hardhat");

const main = async () => {
	const MutaFactory = await hre.ethers.getContractFactory("Muta");
	const MutaContract = await MutaFactory.deploy();
	await MutaContract.deployed();
  console.log( "Contract deployed to:", MutaContract.address ); // 0x4BDc94De936E0A51c7E367bcE1d9EA5cDed6a249 - Address of Muta contract
  
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