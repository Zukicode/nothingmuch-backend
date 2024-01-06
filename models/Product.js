import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		descripiton: {
			type: String,
			required: true,
		},
		sizes: { type: Array, default: [], required: true },
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		availability: {
			type: Boolean,
			required: true,
		},
		images: { type: Array, default: [] },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Product', ProductSchema);
