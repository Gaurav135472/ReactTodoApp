const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://gauravpatel:Gaurav%40078@cluster0.purpgzg.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
    console.log('Connected to MongoDB');
});


const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
