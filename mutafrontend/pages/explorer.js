/** @format */

import React from "react";
import Head from "next/head";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import ParticlesBackground from "../config/ParticlesBackground";
import Navbar from "../components/Navbar";
import { gql, useQuery } from "@apollo/client";
import VideoCard from "../components/VideoCard";

const query = gql`
	{
		videoEvents {
			id
			ipfsURI {
				arweavelink
				name
			}
			videoeventOwner
		}
	}
`;

const Explorer = () => {
	const { loading, error, data } = useQuery(query);

	if (loading)
		return (
			<div>
				<ParticlesBackground />
				<Navbar />
				<p>Loading...</p>
			</div>
		);
	if (error)
		return (
			<div>
				<ParticlesBackground />
				<Navbar />
				<p>`Error! ${error.message}`</p>
			</div>
		);
	return (
		<div>
			<Head>
				<title>Explorer| Home</title>
				<meta
					name="description"
					content="Decentralised Video Agnostic Platform built for Creators and Communities"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ParticlesBackground />
			<div>
				<Navbar />
				<div className="space-y-8 divide-y divide-gray-200 my-16 max-w-7xl mx-auto py-4 px-4 sm:px-6">
					<div className="space-y-6 sm:space-y-5 border-white border-2 rounded-lg px-4 py-4 h-screen">
						{data &&
							data.videoEvents.map((event) => (
								<div key={event.id}>
									<VideoCard id={event.id} name={event.ipfsURI.name} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Explorer;
