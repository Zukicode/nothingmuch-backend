import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
	try {
		const products = await ProductModel.find();

		res.json(products);
	} catch (error) {
		console.log(err);
		res.status(500).json({
			message: "Couldn't load products!",
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const product = await ProductModel.findOne({ _id: req.params.id });

		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Couldn't load product!",
		});
	}
};

export const remove = async (req, res) => {
	try {
		await ProductModel.findOneAndDelete({ _id: req.params.id });

		res.json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Could not find the product!',
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new ProductModel({
			title: req.body.title,
			descripiton: req.body.descripiton,
			sizes: req.body.sizes,
			price: req.body.price,
			quantity: req.body.quantity,
			availability: req.body.availability,
			images: req.body.images,
		});

		const product = await doc.save();

		res.json(product);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Could not create a post!',
		});
	}
};

export const update = async (req, res) => {
	try {
		await ProductModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: { ...req.body } }
		);

		res.json({ success: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Could not update a post!',
		});
	}
};
