// import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";
require('dotenv').config();
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
};

module.exports ={
  solidity:'0.8.27',
  networks:{
    holesky:{
      url: process.env.ALCHEMY_API_URL,
      accounts:[`0x${process.env.PRIVATE_KEY}`]
    }
  }
}

export default config;
