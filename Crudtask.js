import React, { Component } from "react";
import axios from "axios";

class Crudtask extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id: "",
            name: "",
            username: "",
            email: "",



        }
    }

    componentDidMount = () => {
        this.getPost();
    }

    getPost = async () => {

        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users")
            this.setState({ user: response.data })
        } catch (err) {
            console.error(err);
        }
    }

    createPost = async () => {
        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/users",
                {
                    id: this.state.id,
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                })

            let user = [...this.state.user]
            user.push(data);

            this.setState({ user, id: "", name: "", username: "", email: "" })


        } catch (err) {
            console.error(err)
        }
    }

    selectPost = (user) => {
        //console.log(user)

        this.setState({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        })



    }

    handlechange = ({ target: { name, value } }) => {

        this.setState({ [name]: value })

    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.createPost();

    }

    deletePost = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

        let user = [...this.state.user]
        user = user.filter(user => user.id !== id);
        this.setState({ user })
    };


    render() {
        return (
            <>

                <form>
                    <label>Id :</label>
                    <input type="number" name="id" value={this.state.id} onChange={this.handlechange} />
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handlechange} />
                    <label>User:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handlechange} />
                    <br />
                    <br />
                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handlechange} />
                    <input type="submit" onClick={this.handlesubmit} />
                </form>
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.map(user => {
                            return (

                                <tr key={user.id} >
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => this.selectPost(user)}>Edit</button>

                                    </td>
                                    <td><button onClick={() => this.deletePost(user.id)}>Delete</button></td>

                                </tr>


                            )

                        })}

                    </tbody>
                </table>
            </>
        )
    }
}

export default Crudtask;







