import React, { useEffect, useState } from "react";
import { BrowserProvider, ethers } from 'ethers';

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {

    if (!ethereum) return alert('metamask not installed');

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner(0);
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [balance, SetBalance] = useState('');
    const [allTransactions, setAllTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const sendTransaction = async () => {
        
        try {
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();
            const parsedAmount = ethers.parseEther(amount);

            await ethereum.request({
                "method": 'eth_sendTransaction',
                "params": [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount.toString(),
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, keyword, message, parsedAmount);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);

            await transactionHash.wait();
            
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount);

            window.location.reload();


        } catch (error) {
            console.log(error);
            // throw new Error("error in transactions and updating the contract");
        }
    }

    const getAllTransactions = async()=>{
        try {
            if(!ethereum) return alert('please install metamask');
            const transactionContract = await getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTrxn = availableTransactions.map((transaction)=>({
                addressTo : transaction.receiver,
                addressFrom : transaction.sender,
                timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleDateString(),
                message : transaction.message,
                keyword: transaction.keyword,
                amount: ethers.formatEther(transaction.amount)
            })) 
            setAllTransactions(structuredTrxn);
            // console.log(structuredTrxn);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletConnected = async () => {

        try {
            console.log('entered checkifwalletconnected');
            if (!ethereum) return alert("Please install metamask to connect to wallet");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                fetchBalance(accounts[0]);
                getAllTransactions();
            } else {
                console.log('no accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("error in checking if user alr logged in");
        }

    }

    const checkIfTransactionsExist = async () => {
        if(currentAccount){try {
            const transactionContract = await getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount",transactionCount);

        } catch (error) {
            console.log(error)
        }}
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            fetchBalance(accounts[0]); 
        } catch (error) {
            console.log(error);
            throw new Error("error connecting wallet");
        }
    }

    const disconnectWallet = async() => {
        try{
            await ethereum.request({
                "method": "wallet_revokePermissions",
                "params": [
                  {
                    "eth_accounts": {}
                  }
                ]
              });
              window.location.reload();
        }catch(err){
            console.log(err);
            throw new Error('error disconnecting wallet');
        }
    }

    const fetchBalance = async (account) => {
        try {
                const myBalance = await ethereum.request({
                    "method": "eth_getBalance",
                    "params": [
                        account,
                        "latest"
                    ],
                });
                const balanceInEther = ethers.formatEther(BigInt(myBalance));
            // console.log(`Balance: ${balanceInEther} ETH`);
            SetBalance(balanceInEther);
            
        } catch (error) {
            console.log(error);
            throw new Error('error fetching balance');
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
        checkIfTransactionsExist();
    }, [])
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, disconnectWallet, balance, allTransactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
}