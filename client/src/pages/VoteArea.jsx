import React, { useState, useEffect } from 'react';
import useContract from '../utils/useContract';

export default function VoteArea() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [voted, setVoted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { contract, isConnected, signer } = useContract();

    useEffect(() => {
        const fetchCandidates = async () => {
            if (isConnected && contract) {
                const candidates = await contract.getAllCandidate();
                setCandidates(candidates);
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [contract, isConnected, success]);

    useEffect(() => {
        if (signer !== null) setLoading(false);
    }, [signer]);

    const checkIfVoted = async () => {
        const status = await contract.checkVoted(signer.address);
        setVoted(status);
    };

    const vote = async () => {
        checkIfVoted();
        if (voted) {
            setFailed(true);
            setErrorMessage("Already Voted");
            setTimeout(() => {
                setFailed(false);
                setErrorMessage("")
            }, 2000);
        } else {
            try {
                const voteTx = await contract.vote(signer.address, id);
                if (voteTx.hash) {
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 2000);
                }
            } catch (error) {
                setFailed(true);
                setErrorMessage("Error occured")
                setTimeout(() => {
                    setFailed(false);
                    setErrorMessage("")
                }, 2000);
            }
        }
    };

    return (

        <>
            <div style={{ height: "60px" }}>
                {success && (
                    <div className="alert alert-success" role="alert">
                        <strong>Success!!</strong> Successfully registered candidate.
                    </div>
                )}
                {failed && (
                    <div className="alert alert-warning" role="alert">
                        <strong>Failed!!</strong> {errorMessage}
                    </div>
                )}
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <h3 className="text-decoration-underline">Voting Area</h3>
                            <h4 className="mt-4">AvesekTech Solutions</h4>
                            <p className="fs-5">Election for CEO</p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.N.</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Election Id</th>
                                            <th scope="col">Total Vote</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.map((candidate, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{candidate.name}</td>
                                                <td>{candidate.electionId.toString()}</td>
                                                <td>{candidate.voteRecived.toString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 mt-5">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Account</th>
                                    <th scope="col">Choose Representative</th>
                                    <th scope="col">Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td>Loading...</td>
                                        <td>
                                            <input type="number" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                                        </td>
                                        <td></td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td>{signer ? signer.address : 'Loading...'}</td>
                                        <td>
                                            <input type="number" className="form-control" value={id} onChange={(e) => setId(e.target.value)} />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={vote}>Vote</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
