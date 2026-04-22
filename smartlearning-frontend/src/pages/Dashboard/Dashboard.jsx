import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axiosInstance.get("/student/get-students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);

            // if unauthorized → redirect to login
            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>SmartLearning Dashboard</h2>

            <h3>Students List</h3>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                         <th>Name</th>
                        <th>Email</th>
                       
                    </tr>
                </thead>

                <tbody>
                    {students.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                           
                            <td>{s.fullName}</td>
                             <td>{s.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}