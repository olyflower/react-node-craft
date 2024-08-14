import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useGetProductDetailsQuery } from "../../slices/productsSlice";
import { addToCart } from "../../slices/cartSlice";

const ProductDetail = () => {
	const { id: productId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate("/cart");
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data.message || error.error}
				</Message>
			) : (
				<Row>
					<Col md={5}>
						<Image
							src={product.image}
							alt={product.name}
							width={300}
							height={400}
						/>
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviwes`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price: ${product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.countInStock > 0
													? "In Stock"
													: "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) =>
														setQty(
															Number(
																e.target.value
															)
														)
													}
												>
													{[
														...Array(
															product.countInStock
														).keys(),
													].map((el) => (
														<option
															key={el + 1}
															value={el + 1}
														>
															{el + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className="'btn-block"
										type="button"
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductDetail;
