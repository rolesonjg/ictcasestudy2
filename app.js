// Task1: initiate app and run server at 3000

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();;

const path = require('path');
const port = 5001


app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create mongoDB connection 


connectionofmongoose = mongoose.connect('mongodb+srv://rolesonict:stumperball@cluster0.ndqpz8q.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected properly")
    })
    .catch(() => {
        console.log("error;no connection bro")
    });

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    location: String,
    salary: String

    // Add other fields as needed
});

const Employee = mongoose.model('test', employeeSchema);





//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.use(bodyParser.json()); // For parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));






//TODO: get data from db  using api '/api/employeelist'


app.get('/api/employeelist', async (req, res) => {
    try {
        const employees = await Employee.find();
        // console.log(employees);

        return employees
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    // Implement logic to retrieve a single employee by ID
    try {

        const employe = await Employee.findById(req.params.id);
        console.log("getsingle", employe, "getsingleafter");
        return employe
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


app.post('/api/employeelist', async (req, res) => {
    // Implement logic to add a new employee
    console.log(req.body, "req .body of the ")
    try {
        const thenewemployeee = new Employee({
            name: req.body.name,
            position: req.body.position,
            location: req.body.location,
            salary: req.body.salary
        })
        await thenewemployeee.save()

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





//TODO: Update  a employee data from db by using api '/api/employeelist'

app.put('/api/employeelist', async (req, res) => {
    // Implement logic to update an employee by ID

    try {
        console.log(req.body, "req.body of the update")
        const updatedDocument = await Employee.findOneAndUpdate(
            { _id: req.body._id }, // Filter by the document's ID
            {
                name: req.body.name,
                position: req.body.position,
                location: req.body.location,
                salary: req.body.salary
            },
            // { new: true } // Return the updated document
            { new: true }
        );



        // Document was updated successfully
        console.log('Document updated:', updatedDocument);
        return updatedDocument;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }

});





//Request body format:{name:'',location:'',position:'',salary:''}
//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
    // Implement logic to update an employee by ID
    try {
        console.log("deleted id", req.params.id)
        const deletedDocument = await Employee.findByIdAndRemove(req.params.id);

        if (!deletedDocument) {
            console.log('Document n ot found');
            return null;
        }

        // Document was deleted successfully
        console.log('Document deleted:', deletedDocument);
        return deletedDocument;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }


});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

