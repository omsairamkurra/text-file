import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    Name: "",
    Gender: "",
    Experience: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getFormData");
      setFormDataList(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Name || !formData.Gender || !formData.Experience) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:4000/saveFormData", formData);
      setSuccessMessage("Form data saved successfully");
      clearForm();
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Error saving form data");
    }
  };

  const clearForm = () => {
    setFormData({
      Name: "",
      Gender: "",
      Experience: "",
    });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        fetchData(); // Fetch form data after 3 seconds
      }, 3000);
      window.location.reload();
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="Name">
            <label>
              Name:
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </label>
          </div>
          <br />
          <div className="radio">
            <label>
              Gender:
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                name="Gender"
                value="Male"
                checked={formData.Gender === "Male"}
                onChange={handleChange}
              />
              Male
              <input
                style={{ cursor: "pointer" }}
                type="radio"
                name="Gender"
                value="Female"
                checked={formData.Gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          <br />
          <div className="dropdown">
            <label>
              Experience:
              <select
                name="Experience"
                style={{ cursor: "pointer" }}
                value={formData.Experience}
                onChange={handleChange}
              >
                <option value="">Select Experience</option>
                <option value="0 to 3">0 to 3</option>
                <option value="3 to 5"> 3 to 5</option>
                <option value="5 to 8"> 5 to 8</option>
              </select>
            </label>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="savedData">
        <h3>Saved Form Data</h3>
        <ul>
          {formDataList.map((formData, index) => (
            <li key={index}>
              <strong>Name:</strong> {formData.Name}, <strong>Gender:</strong>{" "}
              {formData.Gender}, <strong>Experience:</strong>{" "}
              {formData.Experience}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
