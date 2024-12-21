import { ethers } from "hardhat";

async function main() {
  // Deploy AION Token first
  const AIONToken = await ethers.getContractFactory("AIONToken");
  const token = await AIONToken.deploy();
  await token.deployed();
  console.log("AIONToken deployed to:", token.address);

  // Deploy Marketplace with token address
  const AIONexMarketplace = await ethers.getContractFactory("AIONexMarketplace");
  const marketplace = await AIONexMarketplace.deploy(token.address);
  await marketplace.deployed();
  console.log("AIONexMarketplace deployed to:", marketplace.address);

  // Set up initial roles and configurations
  const ADMIN_ROLE = await marketplace.ADMIN_ROLE();
  await marketplace.grantRole(ADMIN_ROLE, process.env.ADMIN_ADDRESS);
  console.log("Admin role granted to:", process.env.ADMIN_ADDRESS);

  // Verify contracts on Etherscan
  if (process.env.NETWORK !== 'localhost') {
    console.log('Waiting for block confirmations...');
    await marketplace.deployTransaction.wait(6);
    await token.deployTransaction.wait(6);

    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: marketplace.address,
      constructorArguments: [token.address],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
