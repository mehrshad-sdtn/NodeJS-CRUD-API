const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'nodejs' },
    { id: 2, name: 'django' },
    { id: 3, name: 'phoenix' }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (course === undefined) 
    {   
       res.status(404).send('not found');
    }
   res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});