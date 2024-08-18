import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { useGetTopProductsQuery } from "../../slices/productsSlice";
import style from '../../components/ProductCarousel/ProductCarousel.module.css'

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Carousel pause="hover" className="bg-primary mb-4">
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image
							src={product.image}
							alt={product.name}
							className={style.image}
							fluid
						></Image>
						<Carousel.Caption className={style.caption}>
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
