import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const SelcetedClass = () => {
    const { user } = useContext(AuthContext);
    const [selectedClasses, setSelectedClasses] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/selectedClass/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedClasses(data);
            });
    }, [user]);
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/selectedClass/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const updatedSelectedClasses = selectedClasses.filter(
                (classItem) => classItem._id !== id
              );
              setSelectedClasses(updatedSelectedClasses);
            }
            if (data.deletedCount) {
                Swal.fire({
                    icon: 'success',
                    text: 'This Class successfully removed from your selected classes'
                })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
    return (
        <div className="flex flex-col items-center my-16">
            <h1 className="text-2xl font-bold my-4 uppercase">All the classes you have selected are shown here</h1>
            <div className='w-10/12'>
                {selectedClasses.map((classItem) => (
                    <div
                        key={classItem._id}
                        className=" shadow-lg bg-white m-4 transition duration-300 transform hover:scale-105 flex items-center  justify-between"
                    >
                        <div>
                            <img src={classItem.image} alt="" className="w-16 h-16" />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>Price: ${classItem.Price}</h1>
                        </div>
                        <div className='w-96'>
                            <h2 className="text-xl font-bold">{classItem.name}</h2>
                            <p className="text-gray-500">Email: {classItem.email}</p>
                        </div>
                        <div className='flex gap-4'>
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-800 hover:to-pink-800 text-white font-bold py-2 px-8 rounded">
                                Pay
                            </button>
                            <button onClick={() => handleDelete(classItem._id)} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelcetedClass;


{/* <div className="flex items-center p-4">
                            <img src={classItem.image} alt="classItem" className="w-16 h-16 mr-4" />
                            <div>
                                <h2 className="text-xl font-bold">{classItem.name}</h2>
                                <p className="text-gray-500">Email: {classItem.email}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <p>{classItem.Price}</p>
                            <div className="flex gap-4 justify-end p-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Pay
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </div> */}