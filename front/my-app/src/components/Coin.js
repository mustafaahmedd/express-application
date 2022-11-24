import React, { useState, useEffect } from 'react'
import Axios from "axios";

const DisplayRecords = ({ coin }) => {

    return (
        <>
            <h1>COINS DATA</h1>
            <div className='container text-center'>
                <div className='row align-items-center'>
                    <div className='col'></div>
                    <div className='col'>
                        <table className='table table-striped border center'>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Options</th>
                                </tr>

                            </thead>
                            <tbody className='align-items-center'>
                                {coin && coin.map((coin, key) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{coin.id}</td>
                                                <td>{coin.name}</td>
                                                <td>{coin.price}</td>
                                                <td>{coin.quantity}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-outline-dark' style={{ marginRight: "5px" }}>EDIT</button>
                                                    <button className='btn btn-sm btn-danger' style={{ marginRight: "5px" }}>DELETE</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='col'></div>
                </div>
            </div>
        </>
    )
}


const Coin = () => {

    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCoins();
    },[]);

    const getCoins = () => {
        Axios.get('http://localhost:5000/coins')
        .then((response)=>{
            setCoin(response.data.data.paginatedResults)
            setLoading(false);
            console.log("response: ", response.data.data.paginatedResults);
        }).catch( e => alert("Error occured during fetchin Data from DB.",e.message));
    }

    return (
        <>
            <DisplayRecords coin = {coin}/>
        </>
    )
}

export default Coin;
