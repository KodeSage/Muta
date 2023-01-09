import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = ({ loading, message }) => {
	return (
		<>
			{loading && (
				<div className="blspinner">
					<div className="lspinner">
						<ScaleLoader color="#9828A7" loading={loading} width={10} />
						<p className="text-center text-white font-bold text-3xl">
							{message}
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Loader;