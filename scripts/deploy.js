/* eslint-disable no-console */
const { ethers, run, network, ethernal } = require("hardhat");
const fs = require("fs-extra");

const networkName = {
  4: "Rinkeby",
  42: "Kovan",
  77: "Sokol",
  100: "xDai",
};

const networkCurrency = {
  4: "ETH",
  42: "ETH",
  77: "SPOA",
  100: "xDai",
};

const BLOCKSCOUT_CHAIN_IDS = [77, 100];

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  const { chainId } = await deployer.provider.getNetwork();
  console.log("Deploying Test NFTs on network:", networkName[chainId]);
  console.log("Account address:", address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.provider.getBalance(address)),
    networkCurrency[chainId],
  );

  const NFTC1155Test01 = await ethers.getContractFactory("NFTC1155Test01");
  const erc1155 = await NFTC1155Test01.deploy();
  await erc1155.deployed();
  console.log("ERC1155 Address:", erc1155.address);
  let txHash = erc1155.deployTransaction.hash;
  let receipt = await deployer.provider.getTransactionReceipt(txHash);
  console.log("ERC1155 Block Number:", receipt.blockNumber);

  const NFTC721Test01 = await ethers.getContractFactory("NFTC721Test01");
  const erc721 = await NFTC721Test01.deploy();
  await erc721.deployed();
  console.log("ERC721 Address:", erc721.address);

  txHash = erc721.deployTransaction.hash;
  receipt = await deployer.provider.getTransactionReceipt(txHash);
  console.log("ERC721 Block Number:", receipt.blockNumber);

  await erc721.deployTransaction.wait(5);

  const TASK_VERIFY = BLOCKSCOUT_CHAIN_IDS.includes(chainId)
    ? "verify:verify-blockscout"
    : "verify:verify";

  const erc721Address = erc721.address;
  const erc1155Address = erc1155.address;

  await run(TASK_VERIFY, {
    address: erc1155Address,
    constructorArguments: [],
  });
  console.log("Verified ERC1155");

  await run(TASK_VERIFY, {
    address: erc721Address,
    constructorArguments: [],
  });
  console.log("Verified ERC721");

  const deploymentInfo = {
    network: network.name,
    erc721: erc721Address,
    erc1155: erc1155Address,
    txHash,
    blockNumber: receipt.blockNumber.toString(),
  };

  fs.ensureFileSync(`deployments/${network.name}.json`);

  fs.writeFileSync(
    `deployments/${network.name}.json`,
    JSON.stringify(deploymentInfo, undefined, 2),
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
