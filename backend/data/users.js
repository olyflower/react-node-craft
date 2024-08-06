import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin",
		email: "admin@admin.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "Mary Swift",
		email: "mary@mary.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: false,
	},
	{
		name: "Tom One",
		email: "tom@tom.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: false,
	},
];

export default users;
