import { useState, useEffect } from "react";
import { ethers } from "ethers"
import { contractAddress, abi } from "../constants/constant";

const useContract = () => {
    const [contract, setContract] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [signer, setSigner] = useState(null);

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {

                window.ethereum.request({ method: "eth_requestAccounts" })
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
                setSigner(signer)

                setIsConnected(true);
                const contract = new ethers.Contract(contractAddress, abi, signer)
                setContract(contract);
            } catch (error) {
                console.log("Error occured while connectiong to metamask")
            }
        } else {
            console.log("Install Metamask")
        }
    }

    useEffect(() => {
        connectMetamask();
    }, [])

    return { contract, isConnected, signer, connectMetamask }
}

export default useContract;

