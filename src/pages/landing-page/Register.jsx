import {
	Heading,
	FormControl,
	FormLabel,
	Button,
	FormErrorMessage,
	VStack,
	Input,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _axios from "../../utils/_axios";
const initialValues = {
	name: "",
	email: "",
	phone: "",
	password: "",
};

const validationSchema = Yup.object({
	name: Yup.string().required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	phone: Yup.string()
		.matches(/^\d{10}$/, "Invalid phone number")
		.required("Required"),
	password: Yup.string().required("Required"),
});

export default function Register() {
	const toast = useToast();
	const [verificationCode, setVerificationCode] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [formData, setFormData] = useState(null);
	const {
		isOpen: isEmailModelOpen,
		onOpen: onEmailModelOpen,
		onClose: onEmailModelClose,
	} = useDisclosure();

	const onSubmit = async (values) => {
		try {
			await _axios.get(`/user/verify?to=${values.email}`);
			setFormData(values);
			onEmailModelOpen();
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
	const handleRegistration = async () => {
		console.log(verificationCode);
		setIsRegistering(true);
		try {
			setFormData({ ...formData, verificationCode });
			console.log(formData);
			const res = await _axios.post("/user/register", formData);

			toast({
				title: "Registered succesfully",
				description: `Your E-SummitID: ${res.data.summitID}`,
				status: "success",
				isClosable: true,
				position: "top",
			});
			setTimeout(() => {
				window.location.reload();
			}, 9000);
		} catch (error) {
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} finally {
			setIsRegistering(false);
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
			<Heading>Register for ESummit</Heading>
			<FormControl isInvalid={formik.errors.name && formik.touched.name}>
				<FormLabel>Name</FormLabel>
				<Input
					name="name"
					onChange={formik.handleChange}
					value={formik.values.name}
					placeholder="Enter name"
					onBlur={formik.handleBlur}
				/>
				<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={formik.errors.email && formik.touched.email}>
				<FormLabel>Email</FormLabel>
				<Input
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					placeholder="Enter email"
					onBlur={formik.handleBlur}
				/>
				<FormErrorMessage>{formik.errors.email}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={formik.errors.phone && formik.touched.phone}>
				<FormLabel>Phone</FormLabel>
				<Input
					name="phone"
					onChange={formik.handleChange}
					value={formik.values.phone}
					placeholder="Enter password"
					onBlur={formik.handleBlur}
				/>
				<FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={formik.errors.password && formik.touched.password}>
				<FormLabel>Password</FormLabel>
				<Input
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
					placeholder="Enter password"
					onBlur={formik.handleBlur}
				/>
				<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
			</FormControl>

			<Button
				type="submit"
				variant="solid"
				w="100%"
				marginTop="1.5em !important"
				background="pink"
				_hover={{ background: "darkPink" }}
				_focus={{ background: "darkPink" }}
				isLoading={formik.isSubmitting}
			>
				Register
			</Button>

			<Modal isOpen={isEmailModelOpen} onClose={onEmailModelOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontWeight={600}>
							Check your E-Mail for a verification code. Do not reload the page.
						</Text>
						<Text mt="3">Enter verification code</Text>
						<Input
							name="verificationCode"
							value={verificationCode}
							onChange={(e) => {
								setVerificationCode(e.target.value);
							}}
							placeholder=""
						/>
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onEmailModelClose}>
							Close
						</Button>
						<Button
							background="pink"
							_hover={{ background: "darkPink" }}
							_focus={{ background: "darkPink" }}
							onClick={handleRegistration}
							isLoading={isRegistering}
						>
							Enter
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	);
}
