const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/saveFormData", (req, res) => {
  const formData = req.body;
  fs.appendFile("formData.txt", JSON.stringify(formData) + "\n", (err) => {
    if (err) {
      res.status(500).send("Error saving form data");
    } else {
      res.status(200).send("Form data saved successfully");
    }
  });
});
app.get("/getFormData", (req, res) => {
  fs.readFile("formData.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching form data");
    } else {
      const formData = data.trim().split("\n").map(JSON.parse);
      res.status(200).json(formData);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
