import React from 'react'
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import ParticlesBackground from "../config/ParticlesBackground";

const Explorer = () => {
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
          
		</div>
	);
}

export default Explorer;