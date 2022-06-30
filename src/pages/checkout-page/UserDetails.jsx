import {
	Button,
	VStack,
	HStack,
	Heading,
	useToast,
	Divider,
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	Alert,
	AlertIcon,
	Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalPrice, clearCart } from "../../state/cartReducer";

import axios from "../../utils/_axios";
import loadScript from "../../utils/loadScript";
import getUser from "../../utils/getSummitID";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

import "./razorpay-hack.css";
import Auth from "../landing-page/Auth";

const UserDetails = () => {
	const dispatch = useDispatch();

	const items = useSelector(({ cart }) => cart.items.map(({ key }) => key));
	const totalPrice = useSelector(selectTotalPrice);

	// const [couponCode, setCouponCode] = useState("");
	const [discount, setDiscount] = useState(0);
	const [isConfirmationOpen, setConfirmationOpen] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const [referralCode, setReferralCode] = useState("");

	const finalPrice = Math.max(0, (totalPrice * (1 - discount / 100)).toFixed(2));

	const toast = useToast();
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const { summitID, name, email } = getUser();
	const showToast = (status, title, description = "Please contact us or try again later.") => {
		toast({
			title,
			description,
			status,
			duration: status === "error" ? null : 4000,
			isClosable: true,
			position: "top-right",
		});
	};

	const registerWorkshopsViaPayment = async () => {
		setIsRegistering(true);
		const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

		if (!res) {
			showToast(
				"error",
				"Payment handler failed to load.",
				"Retry later or contact us if this issue persists."
			);
		} else {
			try {
				const dataToPost = {
					summitID,
					items,
					// referralCode: values.referralCode,
					totalPrice: parseFloat(finalPrice),
				};
				const res = await axios.post("/passes/order/create", {
					items: dataToPost.items,
					referralCode,
				});
				const orderOptions = res.data;

				const finalOrderOptions = {
					...orderOptions,
					handler: async function (response) {
						const paymentID = response.razorpay_payment_id;

						console.debug(response);
						if (paymentID === undefined) {
							showToast("error", "Payment failed");
						} else {
							try {
								dispatch(clearCart());
								toast.closeAll();

								setIsSuccessModalOpen(true);
							} catch (error) {
								console.log(error);
								showToast(
									"error",
									"Error occurred in Registering. Contact us if money was deducted from your account."
								);
							}
						}
					},
					modal: {
						ondismiss: function () {
							toast.closeAll();
						},
					},
					theme: { color: "#222222" },
				};
				const paymentObject = new window.Razorpay(finalOrderOptions);
				paymentObject.open();
				toast({
					duration: null,
					isClosable: false,
					position: "top",
					render: () => (
						<Alert variant="solid" status="warning" mb="2em" opacity={1}>
							<AlertIcon />
							Do not close or reload this page.
						</Alert>
					),
				});
			} catch (err) {
				console.log(err);
				showToast("error", "An error ocurred in generating your order.");
			} finally {
				setIsRegistering(false);
			}
		}
	};

	const registerWorkshopsWithoutPayment = async () => {
		setIsRegistering(true);

		try {
			const res = await axios.post("/passes/register/coupon", { items });

			if (res.data) {
				dispatch(clearCart());
				setIsSuccessModalOpen(true);
			}
		} catch (error) {
			console.log(error);
			showToast("error", "Error occurred in Registering");
		} finally {
			setIsRegistering(false);
		}
	};

	const verify = async () => {
		try {
			const res = await axios.post("/passes/verify", { summitID, items });

			const errorMessage = res.data;

			// if (values.couponCode && meta.couponsExhaustedFor) {
			// 	const discounts = separateWorkshops
			// 		.filter(({ key }) => !meta.couponsExhaustedFor.includes(key))
			// 		.map(({ key, price }) => ({
			// 			key,
			// 			discount: -1 * price,
			// 		}));
			// 	dispatch(addDiscounts(discounts));
			// }
			// if (values.referralCode && !_errors.referralCode) {
			// 	const referralDiscount = totalPrice * 0.1;
			// 	setReferralDiscount(referralDiscount);
			// } else {
			// 	setReferralDiscount(0);
			// }

			if (errorMessage.length === 0) {
				setConfirmationOpen(true);
			} else {
				showToast("warning", errorMessage);
				setConfirmationOpen(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const setIITMCoupon = async (discountCode) => {
		try {
			const res = await axios.post("/passes/verify", {
				items,
				discountCode,
			});
			const res2 = await axios.post("/passes/register/coupon", {
				items,
				discountCode,
			});
			console.log(res);
			if (res.status === 400 || res.status === 500) throw Error(res.data);
			toast({
				title: "Coupon code succesfully redeemed",
				description: res2.data.message,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			dispatch(clearCart());
			setIsSuccessModalOpen(true);
		} catch (error) {
			toast({
				title: "Error",
				description: error.response.data,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	const handleReferralCode = async () => {
		try {
			await axios.get(`/passes/verify/referral?code=${referralCode}`, {
				withCredentials: true,
			});
			setDiscount(5);
			toast({
				title: "Success",
				description: "Referral code verification succesful, proceed with your payment",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
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

	if (!summitID) {
		return (
			<VStack>
				<Auth />
			</VStack>
		);
	}

	return (
		<VStack spacing={4} align="start" w="100%">
			<Heading size="lg" color="purple">
				Details
			</Heading>
			<Divider />
			<HStack justify="space-between" w="100%">
				<VStack align="flex-start">
					<Text color="gray.300" fontWeight="bold">
						Summit ID
					</Text>
					<Text color="gray.100" fontWeight="semibold">
						{summitID}
					</Text>
				</VStack>
				<VStack align="flex-start">
					<Text color="gray.300" fontWeight="bold">
						Name
					</Text>
					<Text color="gray.100" fontWeight="semibold">
						{name}
					</Text>
				</VStack>
				<VStack align="flex-start">
					<Text color="gray.300" fontWeight="bold">
						Email
					</Text>
					<Text color="gray.100" fontWeight="semibold">
						{email}
					</Text>
				</VStack>
			</HStack>
			{/* {items.length > 0 && email && email.endsWith("@smail.iitm.ac.in") && (
				<Input
					placeholder="Coupon Code"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
				/>
			)} */}
			{/*some comment*/}

			<HStack justify="space-between" w="100%" align="flex-end">
				<VStack align="flex-start">
					{totalPrice > 0 &&
						(discount > 0 ? (
							<>
								<Heading size="md" color="gray.100">
									<strike> {totalPrice ? `₹ ${totalPrice}` : ""}</strike>
								</Heading>
								<Heading size="lg" color="white">
									{totalPrice ? `₹ ${finalPrice}` : ""}
								</Heading>
							</>
						) : (
							<Heading size="lg" alignSelf="flex-end" color="gray.100">
								{totalPrice ? `₹ ${totalPrice}` : ""}
							</Heading>
						))}
				</VStack>
				<Popover
					isOpen={isConfirmationOpen}
					placement="top-end"
					onClose={() => setConfirmationOpen(false)}
				>
					<PopoverTrigger>
						<Button
							mt={4}
							onClick={verify}
							isLoading={isRegistering}
							isDisabled={items.length === 0}
							background="pink"
							_hover={{ background: "darkPink" }}
							_focus={{ background: "darkPink" }}
						>
							Proceed to Pay
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>Confirmation</PopoverHeader>
						<PopoverBody>
							Your total amount is{" "}
							<span style={{ fontWeight: "600" }}>{`₹ ${finalPrice}`}</span>
							{". "}
							Proceed with the payment?
						</PopoverBody>
						<PopoverFooter>
							<HStack justify="flex-end">
								<Button
									isFullWidth
									variant="solid"
									onClick={() => setConfirmationOpen(false)}
									color="purple"
								>
									No
								</Button>
								<Button
									isFullWidth
									isLoading={isRegistering}
									background="pink"
									_hover={{ background: "darkPink" }}
									_focus={{ background: "darkPink" }}
									onClick={() => {
										if (finalPrice <= 0) {
											registerWorkshopsWithoutPayment();
										} else {
											registerWorkshopsViaPayment();
										}
									}}
								>
									Yes
								</Button>
							</HStack>
						</PopoverFooter>
					</PopoverContent>
				</Popover>
			</HStack>
			{items.length > 0 && email && email.endsWith("@smail.iitm.ac.in") && (
				<Button
					type="primary"
					background="purple"
					w="100%"
					onClick={() => {
						setIITMCoupon("IITM50");
					}}
					_hover={{ background: "#512da8" }}
				>
					Avail Free Pass (IITM50)
				</Button>
			)}
			{items.length > 0 && email && email.endsWith("@student.onlinedegree.iitm.ac.in") && (
				<Button
					type="primary"
					background="purple"
					w="100%"
					onClick={() => {
						setIITMCoupon("IITMBSC50");
					}}
					_hover={{ background: "#512da8" }}
				>
					Avail Free Pass (IITMBSC50)
				</Button>
			)}
			{items.length > 0 && email && (
				<div style={{ width: "100%" }}>
					<p style={{ color: "white", fontSize: "20px" }}>Referral Code: </p>
					<HStack w="100%" marginTop="2vh !important">
						<VStack w="70%">
							<Input
								placeholder="Enter referral code"
								value={referralCode}
								color="white"
								onChange={(e) => {
									setReferralCode(e.target.value);
								}}
							/>
						</VStack>
						<VStack w="30%">
							<Button
								background="white"
								color="purple"
								_hover={{ background: "hsla(293, 73%, 0%, 0.23)" }}
								onClick={handleReferralCode}
							>
								Apply Code
							</Button>
						</VStack>
					</HStack>
				</div>
			)}

			{/* </form> */}
			{isSuccessModalOpen && (
				<SuccessModal
					isOpen={isSuccessModalOpen}
					onClose={() => setIsSuccessModalOpen(false)}
				/>
			)}
		</VStack>
	);
};

export default UserDetails;
