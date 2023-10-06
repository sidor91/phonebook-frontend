import { Heading, Text, Box } from "@chakra-ui/layout";
import { useAuth } from "@/utilites/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "@/redux/auth/operations";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/auth/operations";
import { setToken } from "@/redux/auth/slice";

export default function HomePage() {
	const { isLoggedIn } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const verificationToken = searchParams.get("verificationToken");
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			if (verificationToken) {
				try {
					const response = await axiosInstance.get(
						`users/verify/${verificationToken}`
					);
					if (response) {
						setSearchParams("");
						await dispatch(setToken(response.data.token));
						dispatch(fetchCurrentUser());
					}
				} catch (error) {
					console.log(error.message);
				}
			}
		})();
	}, [dispatch, verificationToken]);

	return (
		<Box align="center">
			<Heading
				mt={6}
				as="h1"
				colorScheme="orange"
				fontSize={{ base: "md", sm: "xl" }}
			>
				Hey, welcome to the Phonebook app!
			</Heading>

			{isLoggedIn ? (
				<Text fontSize={{ base: "md", sm: "xl" }}>
					Please follow the contacts page to add or review the contacts.
				</Text>
			) : (
				<Text fontSize={{ base: "md", sm: "xl" }}>
					Please, either login or register to use this app
				</Text>
			)}
		</Box>
	);
}
