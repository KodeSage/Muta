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
				<title>Mụ̀tà| Home</title>
				<meta
					name="description"
					content="Decentralised Video Agnostic Platform built for Creators and Communities"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ParticlesBackground />
			<div>
				<Navbar />
        <HeroSection />
        <Footer />
			</div>

			{/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
		</div>
	);
}
