const app = require('./app');
const mongoose = require('mongoose');


const DB = `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@cluster0.ohmcn.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connection successful!'))
    .catch((err) => console.log('DB connection failed'));





app.listen(3000, function () {
    console.log("Server started on port 3000");
});

