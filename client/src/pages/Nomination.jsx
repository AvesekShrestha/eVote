import React, { useState } from 'react';
import useContract from '../utils/useContract';

export default function Nomination() {
    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    const [symbol, setSymbol] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const { contract } = useContract();

    const registerNomination = async () => {
        try {
            const nominationReceipt = await contract.registerCandidate(name, id, symbol);
            console.log(nominationReceipt);
            console.log(nominationReceipt.hash);

            if (nominationReceipt.hash) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 2000);
            } else {
                setShowFailed(true);
                setTimeout(() => {
                    setShowFailed(false)
                }, 2000)

            }

        } catch (error) {
            console.log(error);
            setShowFailed(true);
            setTimeout(() => {
                setShowFailed(false)
            }, 2000)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "100vh", width: "100vw" }}>

            <div style={{ height: "60px", width: "100vw" }}>
                {showSuccess && (
                    <div className="alert alert-success" role="alert">
                        <strong>Success!!</strong> Successfully registered candidate.
                    </div>
                )}
                {showFailed && (
                    <div className="alert alert-warning" role="alert">
                        <strong>Failed!!</strong> Some error occurred. Please try again!!!
                    </div>
                )}
            </div>

            <div className="container">
                <h3 className='text-decoration-underline mb-5' >Register for Nomintaion</h3>
                <div className='mt-3'>
                    <label htmlFor="validationCustom01" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder='Mark' onChange={(e) => setName(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="validationCustom01" className="form-label">Election Id</label>
                    <input type="number" className="form-control" id="validationCustom01" onChange={(e) => setId(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className='mt-4'>
                    <label htmlFor="validationCustom01" className="form-label">Election Symbol</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="CML" onChange={(e) => setSymbol(e.target.value)} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <button className='btn btn-primary mt-4' onClick={registerNomination}>Register Nomination</button>
            </div>
        </div>
    )
}
