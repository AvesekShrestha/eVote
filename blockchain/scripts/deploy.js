const { ethers } = require("hardhat")

const deploy = async () => {
  const factory = await ethers.getContractFactory("Election")
  const contract = await factory.deploy();

  console.log(`Contract Address : ${await contract.getAddress()}`)

}

deploy()