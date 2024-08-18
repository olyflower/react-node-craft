import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Search = () => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || "");

	const SubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			setKeyword("");
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};

	return (
		<Form onSubmit={SubmitHandler} className="d-flex">
			<FormControl
				type="text"
				className="mr-sm-2 ml-sm-5"
				name="q"
				value={keyword}
				placeholder="Enter product"
				onChange={(e) => setKeyword(e.target.value)}
			></FormControl>
			<Button type="submit" variant="outline-light" className="p-2 mx-2">
				Search
			</Button>
		</Form>
	);
};

export default Search;
