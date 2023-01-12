/** @format */

import React, { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
	return (
		<div>
			<nav className="h-16">
				<div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between cursor-pointer">
					<h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#b12dd0] to-[#ff61d0] py-2">
						Mụ̀tà
					</h3>
					<Link href="/explorer">
						<div>
							<p className="hover:text-[#b12dd0]">Explore</p>
						</div>
					</Link>

					<Link href="/createVideo">
						<div className="bg-gradient-to-l from-[#b12dd0] to-[#ff61d0] px-4 py-3 rounded-md hover:opacity-80">
							<button>Get Started</button>
						</div>
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
