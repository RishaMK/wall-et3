import React from "react";
import { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";
import { TransactionContext } from "../context/TransactionContext";
import { shortenedAddress, shortenedBalance } from "../utils/shortenAddress";

const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({placeholder, name, type, value, handleChange}) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e)=>{handleChange(e, name)}}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {

  const { connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, balance, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const {addressTo, amount, keyword, message} = formData;

    e.preventDefault();
    
    if(!addressTo||!amount||!keyword||!message) return ;

    sendTransaction();
    
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 md:gap-20 ">

        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on crypto.
          </p>
          {!currentAccount && (
          <button type="button" onClick={connectWallet} className="bg-[#2952e3] text-white rounded-full px-4 cursor-pointer my-4 flex hover:bg-[#2546bd] w-full text-center justify-center items-center py-2">Connect Wallet</button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-20">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Realiability</div>
            <div className={`${commonStyles} md:rounded-none rounded-tr-2xl`}>Security</div>
            <div className={`md:rounded-tr-2xl ${commonStyles}`}>Etherium</div>
            <div className={`md:rounded-bl-2xl ${commonStyles}`}>Web3.0</div>
            <div className={`${commonStyles} md:rounded-none rounded-bl-2xl`}>Blockchain</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Low fees</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 justify-normal items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff"></BsInfoCircle>
              </div>
              <div>
                {!currentAccount?(<p className="text-white font-light text-sm">Address</p>):(<p className="text-white font-light text-sm">{shortenedAddress(currentAccount)}</p>)}
                {!currentAccount?(<p className="text-white font-semibold text-lg mt-1">Ethereum</p>):(<p className="text-white font-semibold text-lg mt-1">{shortenedBalance(balance)} ETH</p>)}
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}/>
            <Input placeholder="Amount in ether" name="amount" type="number" handleChange={handleChange}/>
            <Input placeholder="Keyword (gif)" name="keyword" type="" handleChange={handleChange}/>
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>

            <div className="h-[1px] w-full bg-gray-400 my-2"/>
            
            {isLoading? (
              <Loader/>
            ):(<button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[#3v4f7c] rounded-full cursor-pointer hover:bg-white hover:text-black duration-200 transition">Send Now</button>)}

          </div>
        </div>

      </div>
    </div>
  )
};

export default Welcome;