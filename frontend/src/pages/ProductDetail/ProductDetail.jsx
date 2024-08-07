import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Raiting from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useGetProductDetailsQuery } from "../../slices/productsSlice";
import img from "../../assets/img1.jpg";

const ProductDetail = () => {
	const { id: productId } = useParams();
	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error?.data.message || error.error}</Message>
			) : (
				<Row>
					<Col md={5}>
						<Image
							src={img}
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
								<Raiting
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
												{product.CountInStock > 0
													? "In Stock"
													: "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										className="'btn-clock"
										type="button"
										disabled={product.CountInStock === 0}
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
