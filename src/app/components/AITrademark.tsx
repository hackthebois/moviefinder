import Image from "next/image";

const AITrademark = () => {
	return (
		<div className="mt-12">
			<div className="flex items-center">
				<p className="mr-2 italic ">powered by</p>
				<Image
					src="/openai-logo.png"
					alt="Logo for Open AI"
					width={80}
					height={45}
					className="h-auto w-auto"
				/>
			</div>
		</div>
	);
};

export default AITrademark;
