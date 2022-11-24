import React from 'react'

export default function Purchase() {
    return (
        <div>
            <h1>Purchase</h1>
            <div className="row align-items-center">
                <div className="col"></div>
                <div className="col">
                    <div className="">
                        <h2>Form</h2>
                        <form className="form">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="align-items-start">Coins</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Coins.." />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">Quantity</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Quantity.." />
                            </div>
                            <button>Purchase</button>
                        </form>
                    </div>
                </div>
                <div className="col"></div>
            </div>

        </div>
    )
}
