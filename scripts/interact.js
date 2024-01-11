const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const SEPOLIA_URL = process.env.SEPOLIA_URL;

const contractAbi = require("../artifacts/contracts/Omni.sol/OmniToken.json");
// console.log(JSON.stringify(contractAbi.abi));

// Provider
// const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_URL);
const provider = new ethers.AlchemyProvider(network="sepolia", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function totalSupply() {
  const supply = await contract.totalSupply();
  console.log("Total Supply:", supply.toString());
}

async function balanceOf(account) {
  const balance = await contract.balanceOf(account);
  console.log(`Balance of ${account}:`, balance.toString());
}

async function transfer(recipient, amount) {
  const transaction = await contract.transfer(recipient, amount,
    // {
    // gasLimit: gasLimit,
    // gasPrice: gasPrice,
    // }
  );
  console.log("Transfer successful. Transaction hash:", transaction.hash);
}

async function allowance(owner, spender) {
  const allowedAmount = await contract.allowance(owner, spender);
  console.log(
    `Allowance for ${spender} from ${owner}:`,
    allowedAmount.toString()
  );
}

async function approve(spender, amount) {
  const transaction = await contract.approve(spender, amount, {
    gasLimit: gasLimit,
    gasPrice: gasPrice,
  });
  console.log("Approval granted. Transaction hash:", transaction.hash);
}

async function transferFrom(sender, recipient, amount) {
  const transaction = await contract.transferFrom(sender, recipient, amount, {
    gasLimit: gasLimit,
    gasPrice: gasPrice,
  });
  console.log("Transfer from successful. Transaction hash:", transaction.hash);
}

totalSupply();
balanceOf("0xDce0b6709DE395b63E1dFD26bC169C99513ECf50");
// transfer("0xDce0b6709DE395b63E1dFD26bC169C99513ECf50", ethers.parseEther("10"));
// allowance("0xOwnerAddress", "0xSpenderAddress");
// approve("0xSpenderAddress", ethers.utils.parseEther("5"));
// transferFrom(
//   "0xSenderAddress",
//   "0xRecipientAddress",
//   ethers.utils.parseEther("3")
// );
