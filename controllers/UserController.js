import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to register!' });
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({ message: 'The user does not exist!' });
		}

		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		if (!isValidPass) {
			return res.status(404).json({ message: 'Wrong login or password!' });
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Failed to login!' });
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.json(404).json({ message: 'The user does not exist!' });
		}

		const { passwordHash, ...userData } = user._doc;

		res.json(userData);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'No access!' });
	}
};

export const changeAccountInfo = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndUpdate(req.userId, {
			$set: {
				names: req.body.names,
				email: req.body.email,
				phone: req.body.phone,
				avatar: req.body.avatar,
			},
		});

		if (!user) {
			return res.json(404).json({ message: 'The user does not exist!' });
		}

		res.json('Success change!');
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'No access!' });
	}
};

export const changeBillingInfo = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndUpdate(req.userId, {
			$set: {
				billings: {
					street: req.body.street,
					country: req.body.country,
					city: req.body.city,
					zipcode: req.body.zipcode,
				},
			},
		});

		if (!user) {
			return res.json(404).json({ message: 'The user does not exist!' });
		}

		res.json('Success change!');
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'No access!' });
	}
};
