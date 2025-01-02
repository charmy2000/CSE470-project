const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./connectDb');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const budgetRoutes = require('./routes/budget.routes');
const categoryRoutes = require('./routes/category.routes');
const expenseRoutes = require('./routes/expenseRoutes');
const historyRoutes = require('./routes/historyRoutes');
const sharedExpenseRoutes = require('./routes/sharedExpenseRoutes');

//Configure env file
dotenv.config();

//Database connection
connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'views')));


app.use('/api/users', userRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/shared-expenses', sharedExpenseRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Expense Tracker :)</h1><a href='/login.html'>Login</a> | <a href='/register.html'>Register</a>");
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
