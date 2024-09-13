"use client"

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contractDetails";
import { useReadContract } from 'wagmi'

interface ContractProps {
    account: `0x${string}`;
    balance: string | undefined;
}

const ContractIntegration: React.FC<ContractProps> = ({ account, balance }) => {

    const { data } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'balanceOf',
        args: [account],
    })

    const tokenName  = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'name'
    })

    const tokenSymbol  = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'symbol'
    })

    const decimals  = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'decimals'
    })

    console.log(decimals.data, data, account)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="flex flex-col border-2 border-black overflow-hidden p-8 rounded-xl shadow-large bg-yellow-300">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6">
                        <div className="items-center w-full justify-center grid grid-cols-1">
                            <div>
                                <h2 className="text-black font-bold text-lg lg:text-3xl mb-3">
                                    Weclome,
                                </h2>
                                <h2 className="text-black font-bold text-lg lg:text-3xl">
                                    {account ? account.slice(0, 5) + "..." + account.slice(37, 42) : 'User'}
                                </h2>
                                <a
                                    className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full py-1 text-xl mt-4"
                                    href="#"
                                >
                                    View on Explorer
                                </a>
                            </div>
                        </div>
                    </div>
                   
                </div>


                <div className="flex flex-col border-2 border-black overflow-hidden p-8 rounded-xl shadow-large bg-yellow-300">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6">
                        <div className="items-center w-full justify-center grid grid-cols-1 text-center">
                            <div>
                                <h2 className="text-black font-bold text-lg lg:text-3xl">
                                    FIL BALANCE
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-between pb-8 px-6 sm:px-8 space-y-6">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-xl shadow-[5px_5px_black] text-center transform transition w-full lg:px-8 lg:py-4 lg:text-4xl px-4 py-2"
                                href="#"
                            >
                                {balance?.slice(0,10)} FIL
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-2 border-black overflow-hidden p-8 rounded-xl shadow-large bg-yellow-300">
                <div className="mb-4">
                    <div className="items-center w-full justify-center grid grid-cols-1">
                        <div>
                            <h2 className="text-black font-bold text-lg lg:text-3xl">
                                TOKEN BALANCE
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 cursor-pointer justify-between pb-8 space-y-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Token Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Token Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Token Balance
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        1
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {tokenName.data?.toString()} ({tokenSymbol.data})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {CONTRACT_ADDRESS && CONTRACT_ADDRESS.slice(0, 8) + "..." + CONTRACT_ADDRESS.slice(33, 42)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {(Number(data)/ 10 ** Number(decimals.data))?.toString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContractIntegration;