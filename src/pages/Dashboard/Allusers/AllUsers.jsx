import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const Allusers = () => {
    const axiosSecure =useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users',{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    })

    const handleMakeAdmin=(id)=>{
        axiosSecure.patch(`/users/admin/${id}`)
        refetch()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be admin this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, admin it!"
        })
        .then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleDeleteUser=(id)=>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
           <h2 className="text-3xl">all user</h2>
           <h2 className="text-3xl">total users:{users.length}</h2>
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="bold capitalize">
      <tr>
        <th></th>
        <th>Name</th>
        <th>email</th>
        <th>role</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
    {
        users.map((user, index) => <tr key={user._id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
     { user?.role==='admin'?'Admin':<button
            onClick={() => handleMakeAdmin(user._id)}
            className="btn btn-ghost btn-lg">
            <FaUsers className="text-red-600"></FaUsers>
        </button>}
            </td>
            <td>
                <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-lg">
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                </button>
            </td>
        </tr>)
    }
      {/* row 2 */}
   
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Allusers;