/** @format */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ParticlesBackground from "../config/ParticlesBackground";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar, HeroSection, Footer } from "../components";

export default function createVideo() {
	function overrideEventDefaults(event) {
		event.preventDefault();
		event.stopPropagation();
	}
	return (
		<div>
			<Head>
				<title>Mụ̀tà-Create Video| Home</title>
				<meta
					name="description"
					content="Decentralised Video Agnostic Platform built for Creators and Communities"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ParticlesBackground />
			<div>
				<div>
					<nav className="h-16">
						<div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between cursor-pointer">
							<h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#b12dd0] to-[#ff61d0] py-2">
								Mụ̀tà
							</h3>
							<div>
								<p className="hover:text-[#b12dd0]">Explore</p>
							</div>
							<ConnectButton />
						</div>
					</nav>
				</div>
				{/* <form className="space-y-8 divide-y divide-gray-200">
					<div className="space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
							<label
								htmlFor="eventname"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
								Upload VIdeo
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<div
									onDragOver={(e) => overrideEventDefaults(e)}
									onDrop={(e) => onDrop(e)}
									onDragEnter={(e) => overrideEventDefaults(e)}
									onDragLeave={(e) => overrideEventDefaults(e)}
									onDragEnterCapture={(e) => overrideEventDefaults(e)}
									className="uploadcard">
									{data !== null && (
										<div>
											<img src={data?.toString()} />
											<button
												className="deleteButton max-w-lg"
												onClick={() => setData(null)}>
												Remove Image
											</button>
										</div>
									)}
									{data === null && (
										<p>Drag and drop video(less than 15MB file)</p>
									)}
								</div>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
							<label
								htmlFor="eventname"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
								Video name
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									id="event-name"
									name="event-name"
									type="text"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
									required
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
							<label
								htmlFor="event-link"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
								Event link
								<p className="mt-1 max-w-2xl text-sm text-gray-400">
									The link for your virtual event
								</p>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									id="event-link"
									name="event-link"
									type="text"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
									required
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
								Event description
								<p className="mt-2 text-sm text-gray-400">
									Let people know what your event is about!
								</p>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<textarea
									id="about"
									name="about"
									rows={10}
									className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
					<div className="pt-5">
						<div className="flex justify-end">
							<Link href="/">
								<a className="bg-white py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Cancel
								</a>
							</Link>
							<button
								type="submit"
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Create
							</button>
						</div>
					</div>
				</form> */}
			</div>
		</div>
	);
}
