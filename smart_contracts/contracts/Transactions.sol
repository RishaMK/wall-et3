//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Transactions {
    uint256 public transactionCount; 

    event Transfer (address from, address receiver, string keyword, string message, uint amount, uint256 timestamp);

    struct TransferStruct{
        address sender;
        address receiver;
        string keyword;
        string message;
        uint amount;
        uint256 timestamp;
    }

    TransferStruct[] public transactions;

    function addToBlockchain(address payable receiver, string memory keyword, string memory message, uint amount) public{
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, keyword, message, amount, block.timestamp));
        emit Transfer(msg.sender, receiver, keyword, message, amount, block.timestamp);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;  
    }

    function getTransactionCount() public view returns (uint256){
        return transactionCount;
    }

}
