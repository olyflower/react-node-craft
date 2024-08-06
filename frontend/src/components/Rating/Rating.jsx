import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import style from "../Rating/Rating.module.css";

const Rating = ({ value, text }) => {
	const stars = [1, 2, 3, 4, 5];

	const getStarIcon = (starValue) => {
		if (value >= starValue) {
			return <FaStar />;
		} else if (value >= starValue - 0.5) {
			return <FaStarHalfAlt />;
		} else {
			return <FaRegStar />;
		}
	};

	return (
		<div className={style.rating}>
			{stars.map((starValue) => (
				<span key={starValue}>{getStarIcon(starValue)}</span>
			))}
			<span className={style.text}>{text && text}</span>
		</div>
	);
};

export default Rating;
