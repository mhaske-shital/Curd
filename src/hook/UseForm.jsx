import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const UserForm = ({ onSave, defaultUser, onCancel, userToEdit }) => {
	const [formData, setFormData] = useState({
		name: userToEdit ? userToEdit.name : "",
		job: userToEdit ? userToEdit.job : "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};
	useEffect(() => {
		if (defaultUser) {
			setFormData((prev) => ({
				...prev,
				name: defaultUser.email,
				job: defaultUser.first_name
			}))
		}
	}, [])

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Name"
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
				variant="outlined"
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Job"
				type="text"
				name="job"
				value={formData.job}
				onChange={handleChange}
				variant="outlined"
				fullWidth
				margin="normal"
			/>
			<Button type="submit" variant="contained" color="primary" style={{ marginRight: "8px" }}>
				{userToEdit ? "Edit User" : "Create User"}
			</Button>
			<Button type="button" onClick={onCancel} variant="outlined" color="secondary">
				Cancel
			</Button>
		</form>
	);
};

export default UserForm;
