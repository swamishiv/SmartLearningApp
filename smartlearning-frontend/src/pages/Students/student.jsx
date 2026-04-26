import React, { useState } from "react";
import axios from "../../api/axios";

const Students = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/Student/register", student);
      alert("Student Registered Successfully ✅");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error while adding student ❌");
    }
  };

  return (
    <div>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
       <input
  type="text"
  name="fullName"
  placeholder="Enter Full Name"
  value={student.fullName}
  onChange={handleChange}
/>

<input
  type="email"
  name="email"
  placeholder="Enter Email"
  value={student.email}
  onChange={handleChange}
/>

<input
  type="password"
  name="password"
  placeholder="Enter Password"
  value={student.password}
  onChange={handleChange}
/>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default Students;