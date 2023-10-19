const express = require('express');
const mainRoutes = require('./routes/main')
const app = express();
const path = require('path')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src/views')

const port = 3030;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

app.use('/', mainRoutes);