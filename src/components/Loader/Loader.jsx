import { ThreeDots } from "react-loader-spinner";
import { Container } from "./Loader.styled";

function Loader() {
	return (
		<Container>
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#DD6B20"
				ariaLabel="loading"
			/>
		</Container>
	);
}

export default Loader;
