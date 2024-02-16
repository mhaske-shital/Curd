import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUsers,
  setEditUser,
  setFormStatus,
} from "../redux/authSlice";
import { listUsers, editUser, deleteUser } from "../redux/apiHelper";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  console.log("users", users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token) {
          await listUsers();
        }
      } catch (error) {
        console.error("Error fetching user list:", error.message);
      }
    };

    fetchUsers();
  }, [dispatch, token]);

  const handleEditUser = async (user) => {
    try {
      dispatch(setFormStatus("edit"));
      dispatch(setEditUser(user));
      navigate("/add-user");
    } catch (error) {
      console.error("Error editing user:", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await listUsers();
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Error deleting user", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {users.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </TableCell>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>

                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEditUser(user)}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No users found.</Typography>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserList;
