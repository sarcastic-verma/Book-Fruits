// External Libraries
const express = require('express');

// Custom Libraries
const RequestError = require('./middleware/request-error');

// Routes
const fruitRoutes = require('./routes/fruit-routes');
const bookRoutes = require('./routes/book-routes');


// Setup server:
const app = express();
app.use(express.json());

// Setup Routes:

app.use('/api/v1/fruit', fruitRoutes);
app.use('/api/v1/book', bookRoutes);

// Unsupported Routes.
app.use((req, res, next) => {
    throw new RequestError('Could not find this route.', 404);
});

// Error Handling
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-dhan1.gcp.mongodb.net/${process.env.DB_Name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server Started");
        });
    })
    .catch(err => {
        console.log(err);
    });