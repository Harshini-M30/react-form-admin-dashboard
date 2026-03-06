import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

function Form() {

  console.log("Step 1: App component started");

  useEffect(() => {
    console.log("Step 2: App mounted successfully");
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  console.log("Step 3: State variables initialized");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Step 4: Submit button clicked");

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!phone || phone.length !== 10) {
      alert("Phone must be 10 digits");
      return;
    }

    if (!message) {
      alert("Please enter message");
      return;
    }

    console.log("Step 5: Validation Passed");

    const formData = { name, email, phone, message };

    console.log("Step 6: Sending data to backend", formData);

    try {

      const response = await fetch("https://form-backend-79bf.onrender.com/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      console.log("Step 7: Response from backend", data);

      // Send Email AFTER successful submission
      emailjs.send(
        "service_tp4q52e",
        "template_lzsqs79",
        {
          name: name,
          email: email,
          phone: phone,
          message: message
        },
        "xJOURr3-o4W5Yt1t3"
      );

      alert("Form submitted successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container">

      <h1>Application Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br /><br />

        <button type="submit">Submit</button>

      </form>

    </div>
  );
}

export default Form;