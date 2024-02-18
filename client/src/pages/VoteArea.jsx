import React, { useState, useEffect } from 'react'
import useContract from '../utils/useContract'

export default function VoteArea() {
    const [candidates, setCandidates] = useState([])
    const { contract, isConnected } = useContract()

    useEffect(() => {
        const fetchCandidates = async () => {
            if (isConnected && contract) {
                const candidates = await contract.getAllCandidate();
                setCandidates(candidates);
            }
        }
        fetchCandidates()
    }, [contract, isConnected])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <h3 className='text-decoration-underline'>Voting Area</h3>
                <div className="container">
                    {
                        candidates.map((element, index) => {
                            return (
                                <div key={index}>{element.name}</div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
