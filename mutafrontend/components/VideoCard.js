/** @format */

import Link from "next/link";
import Image from "next/image";

export default function VideoCard({ id, name }) {
	return (
		<div className="group relative clickable-card rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
			{/* <Link href={`/event/${id}`}>
				<a className="clickable-card__link"></a>
			</Link> */}
			<div className="block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative group-hover:opacity-75">
				<Image
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpz9K7ax8YtPLvkhHekmqN5iK9sqvrwTpu_HYf4kQlq6XXxY9btHrAAOE0WOvZI43QgbI&usqp=CAU"
					width={40}
					height={40}
					alt="event image"
				/>
			</div>
			<p className="block text-base font-medium text-gray-900">{name}</p>
		</div>
	);
}
