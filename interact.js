const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Replace with your Ethereum node URL

const contractData = fs.readFileSync(
  path.resolve(__dirname, "Omni.sol"),
  "utf8"
);
const output = require("solc").compile(contractData, 1);
const abi = JSON.parse(output.contracts[":Omni"].interface);

const contractAddress = "0xYourContractAddress"; // Replace with your deployed contract address
const gasLimit = 3000000; // Adjust based on your contract interaction requirements
const gasPrice = ethers.utils.parseUnits("5", "gwei"); // Replace with appropriate gas price

const wallet = new ethers.Wallet("0xYourPrivateKey", provider); // Replace with your private key

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function totalSupply() {
  const supply = await contract.totalSupply();
  console.log("Total Supply:", supply.toString());
}

async function balanceOf(account) {
  const balance = await contract.balanceOf(account);
  console.log(`Balance of ${account}:`, balance.toString());
}

async function transfer(recipient, amount) {
  const transaction = await contract.transfer(recipient, amount, {
    gasLimit: gasLimit,
    gasPrice: gasPrice,
  });
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

// totalSupply();
// balanceOf("0xAccountAddress");
// transfer("0xRecipientAddress", ethers.utils.parseEther("10"));
// allowance("0xOwnerAddress", "0xSpenderAddress");
// approve("0xSpenderAddress", ethers.utils.parseEther("5"));
// transferFrom(
//   "0xSenderAddress",
//   "0xRecipientAddress",
//   ethers.utils.parseEther("3")
// );
