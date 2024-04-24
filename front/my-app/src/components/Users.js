import React from "react"
import {usersAPI} from './Constants'
import ReactLoading from 'react-loading'

const DisplayUsers = ({ users }) => {

    return (
        <>
            <div className='container text-center'>
                <div className='row align-items-center'>    
                    <div className='col'></div>
                    <div className='col'>
                        <table className='table table-striped border center'>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Coins</th>
                                    <th>Country</th>
                                    <th>Options</th>
                                </tr>

                            </thead>
                            <tbody className='align-items-center'>
                                {users && users.map(users => {
                                    return (
                                        <>
                                            <tr key={users.id }>
                                                <td >{users.id}</td>
                                                <td>{users.fname +" "+ users.lname}</td>
                                                <td>{users.age}</td>
                                                <td>{users.coins}</td>
                                                <td>{users.Country}</td>
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

class Users extends React.Component{
    state = {
        allUsers: [],
        isLoading: true,
        currentPage : 1,
        per_page : 7
    }

    componentDidMount(){
        setTimeout(()=>{
            this.fetchAPI()
        },1500)
    }

    fetchAPI = () => {
        fetch(usersAPI)
          .then(res => res.json())
          .then(res=> {
            // console.log(res.Users)
            this.setState({
            allUsers: res.Users,
            isLoading: false
          })}
        )
    }
    
    render(){
        const currentPage= this.state.currentPage;
        const per_page= this.state.per_page;
        const allUsers = this.state.allUsers;

        const indexOfLastUser = currentPage * per_page;
        const indexOfFirstUser = indexOfLastUser - per_page;
        const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

        return(
        <>
        <h1>USERS DATA</h1>
          {this.state.isLoading ? (
            <div>
              <ReactLoading className="loading justify-content-md-center" type={"balls"} color={"grey"} />
            </div>
          )  : (
                <DisplayUsers users={currentUsers}/>
            )
          }
        
        </>
        )
    }

}
export default Users;