import React from 'react'
import useContract from '../utils/useContract'

export default function Home() {
    const { contract, isConnected, connectMetamask } = useContract()
    const getContract = () => {
        console.log(contract);
    }

    


    return (
        <>
            <button className="btn btn-primary" onClick={connectMetamask}>Connect</button>
            <button className="btn btn-primary" onClick={getContract}>Contract</button>
        </>
    )
}
