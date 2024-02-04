import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';



const Users = () => {
  const [users,setUsers] = useState([]);
  const [auth] = useAuth();

  //get all users
  const getAllUsers = async () => {
    try{
      const {data} = await axios.get('/api/v1/auth/all-users');
      setUsers(data.users);
    }catch(error)
    {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

   // delete user
   const handleDelete = async (uId) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${uId}`);
      if (data.success) {
        toast.success(`User deleted successfully`);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  // promote user to admin
  const handlePromote = async (userId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/promote-user/${userId}`); //put request to update
      if (data.success) {
        toast.success(`User promoted to admin successfully`);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  // demote user to normal user
  const handleDemote = async (userId) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/demote-user/${userId}`);
      if (data.success) {
        toast.success(`Admin demoted to  User successfully`);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };


  //life cycle method
  useEffect(() => {
    getAllUsers();
  },[]);
  return (
    <Layout title={'Dashboard - All Users'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>We have {users.length} current users</h1>
            <div className='row'>
              {users?.map((u) => (
                <div className='col-md-6' key={u._id}>
                  <div className='card m-2'>
                    <div className='card-body'>
                      <h5 className='card-title'>{u.name}</h5>
                      <h6 className='card-text'>{u.email}</h6>
                      <h6 className='card-text'>Role : {u.role===1?"Admin" : "User"}</h6>
                      {/* {auth?.user?._id !== u._id ? <>
                        
                      </> : "Cannot do anything" } */}
                      <button
                        className='btn btn-success ms-2'
                        onClick={() => handlePromote(u._id)}
                        disabled={u.role === 1 || auth?.user?._id === u._id } // Disable if already an admin
                      >
                        Promote to Admin
                      </button>
                      <button
                        className='btn btn-warning ms-2'
                        onClick={() => handleDemote(u._id)}
                        disabled={u.role === 0 || auth?.user?._id === u._id } // Disable if already a normal user
                      >
                        Demote to User
                      </button>
                        <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(u._id)}} disabled={auth?.user?._id === u._id}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users