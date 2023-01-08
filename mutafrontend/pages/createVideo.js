/** @format */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ParticlesBackground from "../config/ParticlesBackground";
import { Navbar, HeroSection, Footer } from "../components";

export default function Home() {
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
			
			</div>

		</div>
	);
}
