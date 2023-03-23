import Loading from "./common/loading";
import Alert from "./common/alert";
import Confirm from "./common/confirm";

export default function DialogController() {
	return (
		<>
			<Loading />
			<Alert />
			<Confirm />
		</>
	);
}