/** @format */

import React, { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
	return (
		<div>
			<nav className="h-16">
				<div className="container px-8 py-2 flex justify-between items-center cursor-pointer">
					<h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#b12dd0] to-[#ff61d0] py-2">
						Mụ̀tà
					</h3>
					<div>
						<p className="hover:text-[#b12dd0]">Explore</p>
					</div>
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
