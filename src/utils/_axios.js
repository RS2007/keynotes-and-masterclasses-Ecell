import Axios from "axios";

const BASE_URL = import.meta.env.PROD ? "https://api.esummitiitm.org" : "http://localhost:5100";

export default Axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
