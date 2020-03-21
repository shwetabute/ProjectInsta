const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
.connect(db)
.then(() => console.log('MongoDb connected!'))
.catch(err => console.log(err));


//Let's write our first route
app.get('/', (req,res) => res.send('Hello World!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 8060;
app.listen(port, () => console.log(`Server running on port ${port}`));

