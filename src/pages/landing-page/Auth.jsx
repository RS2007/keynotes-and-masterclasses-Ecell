import { Button, toast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import _axios from "../../utils/_axios";
const Auth = () => {
	const handleFailure = async (error, details) => {
		console.log(error, details);
	};
	const googleLoginHandler = async (v) => {
		try {
			console.log(v);
			const res = await _axios.post("/user/auth/google", {
				credential: v.tokenId,
			});
			window.location.reload();
		} catch (err) {
			toast({
				title: "Error",
				description: err.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};
	const [showRegister, setShowRegister] = useState(false);
	return (
		<VStack>
			{showRegister ? <Register /> : <Login />}
			<Button
				onClick={() => {
					setShowRegister(!showRegister);
				}}
				w="100%"
				mt="1em !important"
				type="button"
				variant="link"
			>
				or {showRegister ? "Login" : "Register"}
			</Button>
			<GoogleLogin
				clientId="464718822332-j2lf3b84pbubnk3ovqoqtob146fo303i.apps.googleusercontent.com"
				render={(renderProps) => (
					<GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>
						Sign in with Google
					</GoogleButton>
				)}
				onSuccess={googleLoginHandler}
				onFailure={handleFailure}
				cookiePolicy={"single_host_origin"}
			/>
		</VStack>
	);
};

export default Auth;
