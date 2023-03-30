import LoadingSpinner from "~/components/LoadingSpinner";

const LoadingPage = () => {
	return (
		<div className="flex flex-1 items-center justify-center">
			<LoadingSpinner size={40} />
		</div>
	);
};

export default LoadingPage;
