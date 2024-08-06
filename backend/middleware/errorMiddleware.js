const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let ststusCode = res.ststusCode === 200 ? 500 : res.ststusCode;
	let message = err.message;

	if (err.name === "CastError" && err.kind === "ObjectId") {
		message = `Resource not found`;
		ststusCode = 404;
	}

	res.status(ststusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? "prod" : err.stack,
	});
};

export { notFound, errorHandler };
