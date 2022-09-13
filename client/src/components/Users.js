import React, { useState, useEffect } from 'react';
import crudService from '../services/crud.service';
// import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const [currentCoins, setCurrentUsers ] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
   
    useEffect(() => {
      retreiveUsers();
    }, []);

    const onChangeSearchTitle = e => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
    const retreiveUsers = () => {
      crudService.getAll()
        .then(response => {
          setUsers(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const refreshList = () => {
      retreiveUsers();
      setCurrentUsers (null);
      setCurrentIndex(-1);
    };
    const setActiveUsers = (users, index) => {
      setCurrentUsers (users);
      setCurrentIndex(index);
    };
    
    /*
    const removeAllCoins = () => {
      crudService.removeAll()
        .then(response => {
          console.log(response.data);
          refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    };
    */

    /*
    const findByTitle = () => {
      crudService.findByTitle(searchTitle)
        .then(response => {
          setUsers(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
    */
    return (
        <>
        <h1 >Users</h1>
        <div class="container text-center">
            <div className="row align-items-center">
                <div className="col"></div>
                <div className="col">
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th scope="col">Users</th>
                                <th>Price</th>
                                <th>Users</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bitcoin</td>
                                <td>44000</td>
                                <td>Mustafa</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>FitCoin</td>
                                <td>4000</td>
                                <td>David</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>ShitCoin</td>
                                <td>1000</td>
                                <td>Usman</td>
                                <td>9</td>
                            </tr>
                        </tbody>
                    </table >
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>
    );
  };
export default UsersList;