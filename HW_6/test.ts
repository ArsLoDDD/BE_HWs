import axios from 'axios'
import dotenv from 'dotenv'

const main = async () => {
	dotenv.config()
	const URL = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`

	// const response = await axios.get(URL);

	// console.log("main", response.data);

	// const createUser = await axios.post(`${URL}/user?name=StringMan&age=30`, {
	// 	name: 'ObjectMan',
	// 	email: 'test@test.com',
	// 	phone: '+9999',
	// })
	// console.log("createUser", createUser);
	// console.log('createUser', createUser.data)

	// const createNews = await axios.post(`${URL}/newsposts`, {
	// 	title: 'У зоопарку Чернігова лисичка народила лисеня',
	// 	text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
	// })

	await axios.put(`${URL}/newsposts/12`, {
		title: 'Маленька лисичка',
	})

	const getNews = await axios.get(`${URL}/newsposts/`)
	console.log('getNews', getNews.data)

	// const getNews = await axios.get(`${URL}/news/`)
	// console.log('getNews', getNews.data)

	// const updateUser = await axios.put(`${URL}/user`);
	// console.log("updateUser", updateUser.data);

	// const deleteUser = await axios.delete(`${URL}/user`);
	// console.log("deleteUser", deleteUser.data);

	// const getNews = await axios.get(`${URL}/news`);
	// console.log("getNews", getNews.data);

	// const createNews = await axios.post(`${URL}/news`);
	// console.log("createNews", createNews.data);

	// const updateNews = await axios.put(`${URL}/news`);
	// console.log("updateNews", updateNews.data);

	// const deleteNews = await axios.delete(`${URL}/news`);
	// console.log("deleteNews", deleteNews.data);
}

main()
