import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { shortenedAddress } from '../utils/shortenAddress'
import useFetch from '../hooks/useFetch'


const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount}) =>{

  const gifUrl = useFetch({keyword});
  
  const url = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHZ2bHAxM2sxeWR1aXlyMDFpZ2cwYm80ZnIycDhxemF3bzlsc2tieiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u2UXJG4Ja3K4dNPc3b/giphy.gif'
  
  return(

  <div className='bg-[#181918] m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
  '>
    <div className='flex flex-col items-full w-full md-3 items-center'>
      <div className='w-full mb-6 p-2'>
        
        <a href={`https://holesky.etherscan.io/address/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
        <p className='text-white text-base'>From: <span className='hover:text-gray-400'>{shortenedAddress(addressFrom)}</span> </p>
        </a>
        
        <a href={`https://holesky.etherscan.io/address/${addressTo}`} target='_blank' rel='noopener noreferrer'>
        <p className='text-white text-base'>To: <span className='hover:text-gray-400'>{shortenedAddress(addressTo)}</span></p>
        </a>
        
        <p className='text-white text-base'>Amount: ${amount} ETH</p>
        
        {message && (
          <>
           <br/>
           <p className='text-white text-base'>Message: {message}</p>
          </>
        )}


      </div>
        <img src={gifUrl || url} alt='gif' className='w-64 h-64 rounded-md shadow-lg object-cover'/>

        <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
          <p className='text-[#37c7da] font-bold'>{timestamp}</p>
        </div>
    </div>
  </div>
)}

const Transactions = () => {

  const { currentAccount, allTransactions } = useContext(TransactionContext);
    
  

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        {currentAccount ?
          (<h3 className='text-white text-3xl text-center my-2'>Latest Transactions</h3>)
          :
          (<h3 className='text-white text-3xl text-center my-2'>Connect your account to get started</h3>)
        }
        <div className='flex flex-wrap justify-center items-center mt-10'>
          {...allTransactions.slice().reverse().map((transaction, i) => (
            <TransactionCard key={i}{...transaction}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions