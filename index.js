import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { ProductController, UserController } from './controllers/index.js';
import { checkAuth } from './utils/checkAuth.js';
import { loginValidation, registerValidation } from './validators.js';

mongoose
	.connect('mongodb://localhost:27017/shop')
	.then(() => {
		console.log('DB ok');
	})
	.catch(err => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/change/account', checkAuth, UserController.changeAccountInfo);
app.post('/change/billings', checkAuth, UserController.changeBillingInfo);

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.post('/products', ProductController.create);
app.delete('/products/:id', ProductController.remove);
app.patch('/products/:id', ProductController.update);

app.listen(4444, err => {
	if (err) {
		return console.log(err);
	}

	console.log(`Server started on http://localhost:4444`);
});
