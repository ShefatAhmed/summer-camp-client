import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, [users]);

    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an instructor from now on`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an admin from now on`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <h1 className="text-2xl font-bold mb-8">Manage User</h1>
            <div className="flex flex-wrap justify-center">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="rounded-lg shadow-lg p-4 m-4 flex flex-col items-center bg-gradient-to-r from-purple-50 to-red-50"
                        style={{ width: '80vw' }}
                    >
                        <img
                            className="w-24 h-24 rounded-lg mb-4"
                            src={user.image}
                            alt="User Avatar"
                        />
                        <div className="text-center">
                            <p className="text-gray-500 mb-2">Role: {user.role}</p>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
                        <p className="text-gray-500 mb-4">{user.email}</p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-fuchsia-800 hover:to-rose-500 text-white py-2 px-8 rounded-lg"
                                onClick={() => handleMakeInstructor(user)}
                                disabled={user.role === 'Instructor' || user.role === 'Admin'}
                            >
                                Make Instructor
                            </button>
                            <button
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-500 font-bold text-white py-2 px-8 rounded-lg"
                                onClick={() => handleMakeAdmin(user)}
                                disabled={user.role === 'Instructor' || user.role === 'Admin'}
                            >
                                Make Admin
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUser;