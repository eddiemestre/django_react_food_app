import { useState, useEffect } from "react";
import axios from "../../api/axios";
const Users = () => {
    const [users, setUsers] = useState();

        useEffect(() => {
            let isMounted = true;
            const controller = newAbortController(); // cancel request if component unmounts

            const getUsers = async () => {
                try {
                 const response = await axios.get('', {
                    signal: controller.signal
                 });
                 console.log(response.data);
                 isMounted && setUsers(response.data);
                } catch (err) {
                    console.error(err);
                }
            }

            getUsers();

            return () => {
                isMounted = false;
                controller.abort();
            }
        }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                       {users.map((users, i) => <li key={i}>{users?.username}</li>)} 
                    </ul>
                ) : <p>No users to display</p>
            }

        </article>
    )
}