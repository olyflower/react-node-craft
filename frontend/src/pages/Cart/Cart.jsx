import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Card,
	Button,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message/Message";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import img from "../../assets/img1.jpg";

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = async (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const removeFromCartHandler = async (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=/shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Cart empty...<Link to="/">Go back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image
											src={img}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item._id}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												addToCartHandler(
													item,
													Number(e.target.value)
												)
											}
										>
											{[
												...Array(
													item.countInStock
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
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() =>
												removeFromCartHandler(item._id)
											}
										>
											<FaTrash />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}{" "}
								items )
							</h2>
							$
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default Cart;
