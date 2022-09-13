import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
// import crudService from '../services/crud.service';
import Axios from "axios";

//Component of all the Dataa retrieval
const Records = ({ coin }) => {
    return (
        <>
            <h1>Coins</h1>
            <div className="container text-center">
                <div className="row align-items-center">
                    <div className="col"></div>
                    <div className="col">
                        <table className="table table-stripped border center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody className='align-items-center'>
                                {coin &&
                                    coin.map((coin, key) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td >{coin.id}</td>
                                                    <td>{coin.name}</td>
                                                    <td>{coin.price}</td>
                                                    <td>{coin.quantity}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-outline-dark' style={{ marginRight: "5px" }}> Edit</button>
                                                        <button className='btn btn-sm btn-danger' >Delete </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table >
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    )

}

const Coins = async() => {
    const [coin, setCoins] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [limitPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    // const page = 1;
    // const limit = 4;
    const endIndex = currentPage * limitPerPage;
    const startIndex = endIndex - limitPerPage;
    const currentRecords = coin.slice(startIndex,
        endIndex);
    console.log("length", coin.length)

    const nPages = Math.ceil(16 / limitPerPage); //16 ko dynamic krna hai

    useEffect(() => {
        getCoins();
    }, []);

    const getCoins = () => {
        Axios.get('http://localhost:5000/coins?page=' + currentPage + '&limit=' + limitPerPage)
            .then((response) => {
                setCoins(response.data.data.paginatedResults);
                setLoading(false);
                // console.log('response.data.data :', response.data.data.paginatedResults)
            }).catch(e => alert("There was an error retrieving the data. \n", e.message));
    };

    return (
        <>
            <Records coin={currentRecords} />
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );

}

export default Coins;
