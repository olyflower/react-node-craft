import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { useCreateOrderMutation } from "../../slices/orderSlice";
import { clearCart } from "../../slices/cartSlice";
import { toast } from "react-toastify";

const PlaceOrder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress) {
			navigate("/shipping");
		} else if (!cart.paymentMethod) {
			navigate("/payment");
		}
	}, [
		cart.paymentMethod,
		cart.shippingAddress,
		cart.shippingAddress.address,
		navigate,
	]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();
			dispatch(clearCart());
			navigate(`/order/${res._id}`);
		} catch (error) {
			const errorMessage =
				error?.data?.message ||
				error?.message ||
				"An unknown error occurred";
			toast.error(errorMessage);
		}
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address},{" "}
								{cart.shippingAddress.city}{" "}
								{cart.shippingAddress.postalCode},{" "}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<strong>Payment method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items: </h2>
							{cart.cartItems.length === 0 ? (
								<Message>Cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item) => (
										<ListGroup.Item key={item._id}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item._id}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} =
													${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary: </h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items: </Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping: </Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								{error && (
									<Message variant="danger">
										{error?.data?.message ||
											error?.message ||
											"An error occurred"}
									</Message>
								)}
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
								{isLoading && <Loader />}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrder;
