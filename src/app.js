const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

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
       return res.status(404).send('not found');
    }
   res.send(course);
});




app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
   if (course === undefined) 
    {   
       return res.status(404).send('not found');
    }

    const result = validateCourse(req.body);
    
    if (result.error !== undefined) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update course
    course.name = req.body.name;
    res.send(course);
});




app.post('/api/courses', (req, res) => {
 
    const result = validateCourse(req.body);

    if (result.error !== undefined) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name

    };
    courses.push(course);
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (course === undefined) 
    {   
       return res.status(404).send('not found');
    }
   //delete
   const index = courses.indexOf(course);
   courses.splice(index, 1);
 
   //resp
   res.send(course);
});


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});