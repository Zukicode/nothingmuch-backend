import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		names: {
			firstName: String,
			lastName: String,
		},
		email: {
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatar: String,
		phone: Number,
		billings: {
			street: String,
			country: String,
			city: String,
			zipcode: String,
		},
		orders: { type: Array, default: [] },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);
