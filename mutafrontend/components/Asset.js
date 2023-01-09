/** @format */

import React, { useState, useEffect } from "react";

const Asset = ({ asset, assets, progress }) => {
	const [videoAsset, setVideoAsset] = useState(asset);
	const phase = progress?.[0]?.phase;
	const percent = Math.round(progress?.[0]?.percent * 100);
	
    
	return (
		<>
			<div className="bg-white shadow-md  rounded-lg w-[40%] mt-8">
				<div className="flex flex-row  items-center">
					<div className="flex justify-center items-center w-24 h-20 bg-gradient-to-r from-[#b12dd0] to-[#ff61d0] rounded-l-lg ">
						<p className="text-xl font-semibold text-white">
							.{videoAsset.name.split(".").pop()}
						</p>
					</div>
					<div className="flex flex-col justify-center items-start ml-8">
						<p className="text-lg font-semibold text-gray-700">
							{videoAsset.name}
						</p>
						<p className="mt-4">
							{Math.round(videoAsset.size / 1000000)} MB - {phase && phase} -{" "}
							{percent ? percent : 0}%
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Asset;
