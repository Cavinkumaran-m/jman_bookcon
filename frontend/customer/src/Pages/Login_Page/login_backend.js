const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'jman-mini-project-book-store.cje1ut4sij6i.ap-south-1.rds.amazonaws.com',
        user: 'admin',
        password: 'abcd1234',
        database: 'BOOK_STORE_DB' 
    }
});


const app = express();
const port = process.env.PORT || 3306;

//const initialPath = path.join(__dirname, 'build'); 
const initialPath = path.join(__dirname);
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, 'index.js'));
});

// Add more routes as needed...

// API Routes
app.post('/api/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        res.json('fill all the fields');
    } else {
        db('users')
            .insert({
                name: name,
                email: email,
                password: password
            })
            .returning(['name', 'email'])
            .then(data => {
                res.json(data[0]);
            })
            .catch(err => {
                if (err.detail && err.detail.includes('already exists')) {
                    res.json('email already exists');
                } else {
                    res.status(500).json('Error registering user');
                }
            });
    }
});

app.post('/api/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
        .from('users')
        .where({
            email: email,
            password: password
        })
        .then(data => {
            if (data.length) {
                res.json(data[0]);
            } else {
                res.json('email or password is incorrect');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Error logging in');
        });
});

app.listen(port, () => {
    console.log("Server is running on port "+port);
});