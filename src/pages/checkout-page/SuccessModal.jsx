import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Icon,
} from "@chakra-ui/react";
// import { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const SuccessModal = ({ isOpen, onClose }) => {
	// const initialSeconds = 15;
	// const [seconds, setSeconds] = useState(initialSeconds);
	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setSeconds(seconds - 1);
	// 	}, 1000);
	// 	return () => {
	// 		clearInterval(timer);
	// 	};
	// });

	// if (seconds === 0) {
	// 	window.location.href = "https://esummitiitm.org/portal";
	// }

	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="green.300">Successfully registered!</ModalHeader>
				<ModalBody>
					We have succesfully registered you for your selected workshops.
					<br />
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} color="purple" mr="4">
						Close
					</Button>
					<Button
						rightIcon={<Icon as={FaExternalLinkAlt} />}
						as="a"
						href="https://dashboard.esummitiitm.org"
						color="purple"
					>
						Go to Dashboard
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SuccessModal;
