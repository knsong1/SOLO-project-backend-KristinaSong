const express = require('express')
const app = express()
const port = 30002


app.use(express.json());
app.use(express.static('public'));

const parser = require('body-parser');
app.use(parser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static( 'public'));


const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('postgres://postgres@localhost:5432/solo-react')

// const { User } = require('./models');
const { Todos } = require('./models');
const { Calendar } = require('./models');

app.post('/add-event', async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
 const { event, startDate, endDate, startTime, endTime, allDate, description } = req.body;
 const newEvent = await Calendar.create({
  event, 
  startDate, 
  endDate, 
  startTime, 
  endTime, 
  allDate, 
  description
 });
 
 // Send back the new user's ID in the response:
  res.json({
      id: newEvent.id
  })
})

app.get('/list-events', async (req, res) => {
  const events = await Calendar.findAll({
      attributes: ['event', 'startDate', 'endDate', 'startTime', 'endTime', 'allDate', 'description' ]
  });
  res.json(events);
});

app.delete('/delete-events/:id', async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await Calendar.destroy({
      where:
       {
          id
      }
  });
  res.json(deletedEvent);
});

app.post('add-todo'), async(req, res) => {
  const { todo } = req.body;
  const newTodo = await Todos.create({
   todo
  });
  
  // Send back the new user's ID in the response:
   res.json({
       id: newTodo.id
   })
}
app.get('/list-todos', async (req, res) => {
  const todos = await Todos.findAll({
      attributes: ['todo']
  });
  res.json(todos);
});

app.delete('/delete-todos/:id', async (req, res) => {
  const { id } = req.params;
  const deletedToDo = await Todos.destroy({
      where:
       {
          id
      }
  });
  res.json(deletedToDo);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})