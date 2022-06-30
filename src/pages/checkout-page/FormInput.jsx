import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	InputGroup,
	InputLeftAddon,
	Icon,
} from "@chakra-ui/react";
import { FaTicketAlt, FaUserTag, FaHashtag, FaUser } from "react-icons/fa";

const inputIcons = {
	summitID: FaHashtag,
	couponCode: FaTicketAlt,
	referralCode: FaUserTag,
	name: FaUser,
};

const FormInput = ({ _key, displayName, errors, _ref }) => {
	return (
		<FormControl isInvalid={errors[_key]} mb="1em !important">
			<FormLabel htmlFor={_key} color="gray.200">
				{displayName}
			</FormLabel>
			<InputGroup>
				<InputLeftAddon>
					<Icon as={inputIcons[_key]} />
				</InputLeftAddon>
				<Input
					name={_key}
					placeholder={displayName}
					ref={_ref}
					variant="filled"
					isReadOnly={_key !== "discountCode"}
					isDisabled={_key !== "discountCode"}
				/>
			</InputGroup>
			<FormErrorMessage>{errors[_key] && errors[_key].message}</FormErrorMessage>
		</FormControl>
	);
};

export default FormInput;
