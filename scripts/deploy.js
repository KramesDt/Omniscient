const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.provider.getSigner();
  console.log("Deploying contracts with the account:", deployer.address);
  const accountBalance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  // console.log("Account balance:", await ethers.utils.formatEther(weiAmount));

  const Omni = await ethers.getContractFactory("OmniToken");
  const omni = await Omni.deploy();
  await omni.waitForDeployment();

  console.log("Token address:", omni.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
