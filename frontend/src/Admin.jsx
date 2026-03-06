import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

function Admin() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("https://form-backend-79bf.onrender.com/api/applications")
      .then(res => res.json())
      .then(data => {
        setApplications(data.data);
      });
  }, []);

  const downloadPDF = (app) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Application Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${app.name}`, 20, 40);
    doc.text(`Email: ${app.email}`, 20, 50);
    doc.text(`Phone: ${app.phone}`, 20, 60);
    doc.text(`Message: ${app.message}`, 20, 70);

    const date = new Date(app.createdAt);
    doc.text(`Date: ${date.toLocaleDateString()}`, 20, 80);
    doc.text(`Time: ${date.toLocaleTimeString()}`, 20, 90);

    doc.save(`${app.name}_application.pdf`);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Download</th>
          </tr>
        </thead>

        <tbody>

          {applications.map((app, index) => {

            const date = new Date(app.createdAt);

            return (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{date.toLocaleDateString()}</td>
                <td>{date.toLocaleTimeString()}</td>
                <td>
                  <button onClick={() => downloadPDF(app)}>
                    Download PDF
                  </button>
                </td>
              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}

export default Admin;