const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.provider.getSigner();
  console.log("Deployer: ", deployer);
  console.log("Deploying contracts with the account:", deployer.address);
  const weiAmount = (await deployer.getBalance()).toString();
  console.log("Account balance:", await ethers.utils.formatEther(weiAmount));

  const initialSupply = 1000000; // Replace with the desired initial supply
  const initialTokenPrice = ethers.utils.parseEther("3"); // Set the initial price to $3 in Ether

  const Omni = await ethers.getContractFactory("Omniscient");
  const omni = await Omni.deploy(
    "Omniscient",
    "OMNI",
    initialSupply,
    initialTokenPrice,
    {
      gasLimit: gasLimit,
      gasPrice: gasPrice,
    }
  );

  console.log("Token address:", omni.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
