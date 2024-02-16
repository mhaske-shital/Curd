import React, { useState } from "react";
import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { addUser } from "../redux/apiHelper";
import UserForm from "../hook/UseForm";
import { useSelector } from "react-redux";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { editUser } = useSelector((state) => state.auth);
  console.log("editUser", editUser);
  const handleSaveUser = async (formData) => {
    if (editingUser) {
    } else {
      const addedUser = await addUser(formData);
      setUsers((prevUsers) => [...prevUsers, addedUser]);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <UserForm
        onSave={handleSaveUser}
        defaultUser={editUser}
        onCancel={handleCancelEdit}
        userToEdit={editingUser}
      />
    </div>
  );
};

export default AddUser;
