/** @format */
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Head from "next/head";
import Asset from "../components/Asset";
import connectContract from "../utils/connectContract";
import ParticlesBackground from "../config/ParticlesBackground";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import Loader from "../components/Loader";
import { useProvider, useSigner } from "wagmi";
import fileReaderStream from "filereader-stream";
import BigNumber from "bignumber.js";
import { WebBundlr } from "@bundlr-network/client";
import { Web3Storage, File, Blob } from "web3.storage";

export default function createVideo() {
	const rainbowKitProvider = useProvider();
	 const { chain, chains } = useNetwork();
	const { data: rainbowKitSigner, isError, isLoading } = useSigner();
	const [WatchCapacity, setWatchCapacity] = useState("");
	const fundAmount = 0.1;
	const [BUN, setBUN] = useState(null);
	const [video, setVideo] = useState(null);
	const [videoType, setVideoType] = useState(null);
	const [videoName, setvideoName] = useState("");
	const [videoDescription, setvideoDescription] = useState("");
	const [loading, setLoading] = useState(null);
	const [message, setMessage] = useState();
	const [videoEventID, setVideoEventID] = useState(null);
	const [success, setSuccess] = useState(null);
	const { address } = useAccount();

	const onDrop = useCallback(async (acceptedFiles) => {
		if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
			setVideo(acceptedFiles[0]);
			setVideoType(acceptedFiles[0]["type"]);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"video/*": ["*.mp4"],
		},
		maxFiles: 1,
		onDrop,
	});

	const UploadAreweave = async (video, videoType) => {
		const dataStream = fileReaderStream(video);
		if (!rainbowKitSigner) {
			setMessage("Please connect your wallet first.");
			return;
		}
		setMessage("Preparing to Upload to Arweavea");
		rainbowKitProvider.getSigner = () => rainbowKitSigner;
		const bundlr = new WebBundlr(
			"https://devnet.bundlr.network",
			"matic",
			rainbowKitProvider,
			{
				providerUrl: "https://matic-mumbai.chainstacklabs.com",
			}
		);
		await bundlr.ready();
		//Fund Bund Wallet
		const fundAmountParsed = new BigNumber(fundAmount).multipliedBy(
			bundlr.currencyConfig.base[1]
		);
		await bundlr.fund(fundAmountParsed.toString());
		setMessage("Wallet Funded");
		const tx = await bundlr.upload(dataStream, {
			tags: [{ name: "Content-Type", value: videoType }],
		});

		return tx.id;
	};
	function getAccessToken() {
		return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
	}
	function makeStorageClient() {
		return new Web3Storage({ token: getAccessToken() });
	}
	const UploadFilestoWeb3Storage = async (body) => {
		const client = makeStorageClient();
		const blob = new Blob([JSON.stringify(body)], {
			type: "application/json",
		});
		const files = [new File([blob], "data.json")];
		const cid = await client.put(files);
		console.log( "stored files with cid:", cid );
		setMessage("Done Uploading to IPFS/FILECOIN");
		return cid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (video !== null) {
			setLoading(true);
			try {
				const arweaveid = await UploadAreweave(video, videoType);
				if (arweaveid) {
					setMessage("Preparing to Upload to IPFS/FILECOIN");
					const link = `ar://${arweaveid}`;
					const body = {
						name: videoName,
						description: videoDescription,
						arweavelink: link,
					};
					const cid = await UploadFilestoWeb3Storage(body);

					if ( cid )
					{
						setMessage("Preparing to Upload to Ploygon Blockchain");
						await UploadToBlockchain(cid);
					}
				}
			} catch (error) {
				console.log(
					`Oops! Something went wrong. Please refresh and try again. Error ${error}`
				);
			}
		}
	};

	const UploadToBlockchain = async (cid) => {
		try {
			const mutaContract = connectContract();

			if (mutaContract) {
				let videocontentDataCID = cid;
				let maxWatchCapacity = WatchCapacity;
				const txn = await mutaContract.createVideoNewContent(
					videocontentDataCID,
					maxWatchCapacity,
					{ gasLimit: 900000 }
				);
				console.log("Minting...", txn.hash);
				let wait = await txn.wait();
				console.log("Minted -- ", txn.hash);
				setVideoEventID(wait.events[0].args[0]);
				setSuccess(true);
				setMessage("Your Video has been created successfully.");
				setLoading(false);
			} else {
				console.log("Error getting contract.");
			}
		} catch (e) {
			setSuccess(false);
			setMessage(
				`There was an error creating your videoevent: ${error.message}`
			);
			setLoading(false);
			console.log(error);
		}
	};

	return (
		<>
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
					<div>
						{address && !success && chain.name === "Polygon Mumbai" && (
							<form
								className="space-y-8 divide-y divide-gray-200 my-16 max-w-7xl mx-auto py-4 px-4 sm:px-6"
								onSubmit={handleSubmit}>
								<div className="space-y-6 sm:space-y-5 border-white border-2 rounded-lg px-4 py-4 h-screen">
									<div>
										{video ? (
											<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center cursor-pointer">
												<Asset video={video} />
											</div>
										) : (
											<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center cursor-pointer">
												<div
													{...getRootProps({ className: "dropzone" })}
													className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border py-6 my-6 rounded-md h-24">
													<input {...getInputProps()} />
													<p className="text-center">
														Drag and drop a video file
													</p>
												</div>
											</div>
										)}
									</div>
									<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center">
										<input
											id="event-name"
											name="event-name"
											type="text"
											placeholder="Title of The Video"
											className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 px-4 focus:border-indigo-500 sm:text-sm border py-4 my-2 rounded-md"
											value={videoName}
											onChange={(e) => setvideoName(e.target.value)}
											required
										/>
									</div>
									{/* {process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN} */}
									<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center">
										<input
											id="event-name"
											name="event-name"
											type="text"
											placeholder="Description of The Video"
											className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 px-4 focus:border-indigo-500 sm:text-sm border py-6 my-2 rounded-md"
											value={videoDescription}
											onChange={(e) => setvideoDescription(e.target.value)}
											required
										/>
									</div>
									<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center">
										<input
											type="number"
											name="max-capacity"
											id="max-capacity"
											min="1"
											placeholder="Max Watch Capacity (e.g. 100)"
											className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border py-6 px-4 my-2 rounded-md"
											value={WatchCapacity}
											onChange={(e) => setWatchCapacity(e.target.value)}
											required
										/>
									</div>
									<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center">
										<button
											type="submit"
											className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-[#ff61d0] hover:bg-[#ff61d0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
											Publish
										</button>
									</div>
								</div>
							</form>
						)}
					</div>
					<div>
						{!address && (
							<section className="sm:pt-5 sm:flex sm:justify-center sm:items-center sm:flex-col py-8">
								<p className="mb-4">
									Please connect your wallet to create video content on the
									Blockchain.
								</p>
								<ConnectButton />
							</section>
						)}
					</div>
					{success && videoEventID && (
						<div>
							Success! Please wait a few minutes, then check out your videoevent
							page
							<span className="font-bold">
								<Link href={`/event/${videoEventID}`}>here</Link>
							</span>
						</div>
					)}
				</div>
			</div>
			{loading && <Loader loading={loading} message={message} />}
		</>
	);
}
