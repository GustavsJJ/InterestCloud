const express = require("express");
const app = express();

const port = 5000;

app.get('/api/customers', (req, res) => {
    const customers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe"
        },
        {
            id: 2,
            firstName: "Gustavs Jānis",
            lastName: "Jākobsons"
        },
        {
            id: 3,
            firstName: "Pēteris",
            lastName: "Bērziņš"
        }
    ];
    res.json(customers);
});
  
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})
