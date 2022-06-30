import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	VStack,
	useToast,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import _axios from "../../utils/_axios";
const initialValues = {
	summitID: "",
	password: "",
};

const validationSchema = Yup.object({
	summitID: Yup.string()
		.matches(/^[A-Z0-9]{4}$/g, "Invalid Summit ID")
		.required("Required"),
	password: Yup.string().required("Required"),
});

const Login = () => {
	const toast = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const onSubmit = async (values) => {
		try {
			const res = await _axios.post("/user/login", values);
			if (res.status === 400 || res.status === 500) {
				toast({
					title: "Error",
					description: res.data.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Login succesful",
					description: "Continue with your payment",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<VStack
			as="form"
			mx="auto"
			w={{ base: "90%", md: 500 }}
			h="fit-content"
			onSubmit={formik.handleSubmit}
			color="white"
		>
			<Heading>Login</Heading>
			<FormControl isInvalid={formik.errors.summitID && formik.touched.summitID}>
				<FormLabel>E-Summit ID</FormLabel>
				<InputGroup size="md">
					<InputLeftAddon width="4.5rem" color="background1">
						ES22
					</InputLeftAddon>
					<Input
						name="summitID"
						onChange={formik.handleChange}
						value={formik.values.summitID}
						placeholder="Enter ESummit ID"
					/>
				</InputGroup>

				<FormErrorMessage>{formik.errors.summitID}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={formik.errors.password && formik.touched.password}>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						name="password"
						type={showPassword ? "text" : "password"}
						onChange={formik.handleChange}
						value={formik.values.password}
						placeholder="Enter password"
					/>
					<InputRightAddon width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={() => setShowPassword((s) => !s)}
							color="purple"
							variant="ghost"
							_focus={{ outline: "none" }}
						>
							{showPassword ? "Hide" : "Show"}
						</Button>
					</InputRightAddon>
				</InputGroup>
				<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
			</FormControl>

			<Button
				type="submit"
				w="100%"
				isLoading={formik.isSubmitting}
				marginTop="1.5em !important"
				background="pink"
				_hover={{ background: "darkPink" }}
				_focus={{ background: "darkPink" }}
			>
				Login
			</Button>
		</VStack>
	);
};

export default Login;
