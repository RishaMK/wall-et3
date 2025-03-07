import hre from "hardhat";
// import { ethers } from "hardhat"; 

const main = async() => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();

    await transactions.waitForDeployment();

    const address = await transactions.getAddress();

    console.log("transactions deployed to: ", address)

}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();