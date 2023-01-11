/** @format */
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Head from "next/head";
import Asset from "../components/Asset";
import connectContract from "../utils/connectContract";
import ParticlesBackground from "../config/ParticlesBackground";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";
import { useCreateAsset, useAsset } from "@livepeer/react";
import BigNumber from "bignumber.js";
import { useProvider, useSigner } from "wagmi";
import { WebBundlr } from "@bundlr-network/client";
import Loader from "../components/Loader";

export default function createVideo() {
	const rainbowKitProvider = useProvider();
	const [BUN, setBUN] = useState(null);
	const { data: rainbowKitSigner, isError, isLoading } = useSigner();
	const [video, setVideo] = useState(null);
	const fundAmount = 0.1;
	const [livepeerId, setlivepeerId] = useState(null);
	const [videoName, setvideoName] = useState("");
	const [videoDescription, setvideoDescription] = useState("");
	const [arweaveCID, setaArweaveCID] = useState(null);
	const [ipfsCID, setaipfsCID] = useState(null);
	const [loading, setLoading] = useState(null);
	const [message, setMessage] = useState();
	const { address } = useAccount();

	//LIVEPEER STUFF
	const {
		mutate: createAsset,
		data: asset,
		status,
		progress,
		error,
	} = useCreateAsset(
		video
			? {
					sources: [{ name: video.name, file: video }],
			  }
			: null
	);
	const onDrop = useCallback(async (acceptedFiles) => {
		if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
			setVideo(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"video/*": ["*.mp4"],
		},
		maxFiles: 1,
		onDrop,
	});
	const progressFormatted = useMemo(
		() =>
			progress?.[0].phase === "failed"
				? "Failed to process video."
				: progress?.[0].phase === "waiting"
				? "Waiting"
				: progress?.[0].phase === "uploading"
				? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
				: progress?.[0].phase === "processing"
				? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
				: null,
		[progress]
	);

	// const progressTracker = useMemo(() => {}, [progress]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await createAsset?.();
		setMessage("Uploading Video to LivePeer");
	};
	const UploadToArweave = async (assertId) => {
		if (!rainbowKitSigner) {
			setMessage("Please connect your wallet first.");
			return;
		}
		setMessage("Preparing to Upload to Arweaveasa");
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


		const fundAmountParsed = new BigNumber(fundAmount).multipliedBy(
			bundlr.currencyConfig.base[1]
		);

		await bundlr
			.fund(fundAmountParsed.toString())
			.then((res) => {
				setMessage( "Wallet Funded" );
				setBUN(bundlr);
			})
			.catch((e) => {
				console.log(e);
				setMessage("Error While Funding ", e.message);
			});
	};
	const UploadToBlockchain = async (arweaveCID) => {
		try {
			const mutaContract = connectContract();

			if (mutaContract) {
				let DateAndTime = new Date();
				let videoTimestamp = DateAndTime.getTime();
				let videocontentDataCID = arweaveCID;
				const txn = await mutaContract.createVideoNewContent(
					videoTimestamp,
					videocontentDataCID,
					{ gasLimit: 900000 }
				);
				console.log("Minting...", txn.hash);
				let wait = await txn.wait();
				console.log("Minted -- ", txn.hash);
				setMessage("Your Video has been created successfully.");
				setLoading(false);
			} else {
				console.log("Error getting contract.");
			}
		} catch (e) {}
	};
		const preparingToUpload = async () => {
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

			try {
				const body = {
					asset: livepeerId,
					title: videoName,
					description: videoDescription,
				};
				let response = await bundlr.upload(body);
				setaArweaveCID(`ar://${response.id}`);
				setMessage(`Data uploaded ==> ar://${response.id}`);
				if (arweaveCID) {
					setMessage("Uploading to Blockchain");
					await UploadToBlockchain(arweaveCID);
				}
			} catch (e) {
				console.log("Error uploading file ", e);
			}
		};

	useEffect(() => {
		const progressTracker = async () => {
			if (progress?.[0].phase === "ready") {
				setMessage("Video Uploaded to Livepeer......");
				setlivepeerId(asset?.[0]?.playbackId);
				setMessage("Preparing to Upload to Arweave");
			}
			if (livepeerId) {
				await UploadToArweave(livepeerId);
			}

			if (message === "Wallet Funded") {
				setMessage("Completing Upload to Arweave");
				preparingToUpload();
			}
		};
		progressTracker();
	}, [progress, livepeerId, message, arweaveCID]);

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
						{address && (
							<form
								className="space-y-8 divide-y divide-gray-200 my-16 max-w-7xl mx-auto py-4 px-4 sm:px-6"
								onSubmit={handleSubmit}>
								<div className="space-y-6 sm:space-y-5 bg-white h-screen">
									<div>
										<div className="sm:pt-5 sm:flex sm:justify-center sm:items-center cursor-pointer">
											<div
												{...getRootProps()}
												className="bg-slate-500 text-white w-full py-8 mx-8">
												<input {...getInputProps()} />
												<p className="text-center">
													Drag and drop a video file
												</p>
											</div>
										</div>
										{video && (
											<div className="sm:pt-5 sm:flex sm:justify-center sm:items-center cursor-pointer">
												<Asset video={video} progress={progress} />
											</div>
										)}
									</div>
									<div className="sm:pt-5 sm:flex sm:justify-center sm:items-center">
										<input
											id="event-name"
											name="event-name"
											type="text"
											placeholder="Title of The Video"
											className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border py-4 my-4 rounded-md"
											value={videoName}
											onChange={(e) => setvideoName(e.target.value)}
											required
										/>
									</div>
									<div className="sm:pt-2 sm:flex sm:justify-center sm:items-center">
										<input
											id="event-name"
											name="event-name"
											type="text"
											placeholder="Description of The Video"
											className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border py-6 my-6 rounded-md"
											value={videoDescription}
											onChange={(e) => setvideoDescription(e.target.value)}
											required
										/>
									</div>
									<div>
										<button
											type="submit"
											className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-[#ff61d0] hover:bg-[#ff61d0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
				</div>
			</div>
			{loading && (
				<Loader
					loading={loading}
					message={message}
					progressFormatted={progressFormatted}
				/>
			)}
		</>
	);
}
