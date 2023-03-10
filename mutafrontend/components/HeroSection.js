/** @format */

import React from "react";
import Link from "next/link";
import { AiOutlineShake } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdOutlineVideoSettings} from "react-icons/md"

const HeroSection = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
			<div className="flex justify-center flex-col items-center cursor-pointer">
				<h3 className="text-4xl text-center w-full">
					<span className="uppercase font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#b12dd0] to-[#ff61d0]">
						Mụ̀tà:{" "}
					</span>
					Decentralised Video Agnostic Platform built for{" "}
					<span className="font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#ff71ce] to-[#f80cf0] px-2">
						Creators
					</span>
					and
					<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff71ce] to-[#f80cf0] px-2">
						Communities
					</span>
				</h3>
				<p className="my-4">
					Connect and share engaging video contents with your web3 Frens!!!!
				</p>
				<Link href="/createVideo">
					<div className="bg-gradient-to-l from-[#b12dd0] to-[#ff61d0] px-4 py-3 rounded-md hover:opacity-80 my-4">
						<button>Get Started</button>
					</div>
				</Link>
			</div>
			<div className="py-12 px-4 sm:px-6">
				<h3 className="text-2xl font-bold text-center w-full">Features</h3>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 px-6">
				<div className="flex py-12 px-4 items-center justify-between border-white border-2 rounded-lg">
					<div>
						<BsFillCameraVideoFill size={55} color="#f80cf0" />
					</div>
					<p className="text-4xl font-bold">Video Publications</p>
				</div>
				<div className="flex py-12 px-4 items-center justify-between border-white border-2 rounded-lg">
					<div>
						<AiOutlineShake size={55} color="#f80cf0" />
					</div>
					<p className="text-4xl font-bold">Video Sharing</p>
				</div>
				<div className="flex py-12 px-4 items-center justify-between border-white border-2 rounded-lg">
					<div>
						<MdOutlineVideoSettings size={55} color="#f80cf0" />
					</div>
					<p className="text-4xl font-bold">Live Streaming</p>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
