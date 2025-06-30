
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy AidToken contract
  const AidToken = await hre.ethers.getContractFactory("AidToken");
  const aidToken = await AidToken.deploy(
    "CrisisChain Aid Token",
    "CAT",
    1000000, // 1M tokens
    deployer.address
  );

  await aidToken.deployed();

  console.log("AidToken deployed to:", aidToken.address);
  console.log("Transaction hash:", aidToken.deployTransaction.hash);

  // Verify contract on Etherscan if not on localhost
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await aidToken.deployTransaction.wait(6);
    
    await hre.run("verify:verify", {
      address: aidToken.address,
      constructorArguments: [
        "CrisisChain Aid Token",
        "CAT",
        1000000,
        deployer.address
      ],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
