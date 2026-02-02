"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { banner1, banner2, banner3 } from "@/assets";
import Link from "next/link";

const HeroCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const slides = [
		{ id: 1, image: banner1 },
		{ id: 2, image: banner2 },
		{ id: 3, image: banner3 },
	];

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, [slides.length]);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 5000);
	};

	useEffect(() => {
		if (!isAutoPlaying) return;
		const interval = setInterval(() => {
			nextSlide();
		}, 5000);
		return () => clearInterval(interval);
	}, [isAutoPlaying, nextSlide]);

	return (
		<>
			<div className="pt-24 flex flex-col items-center w-full overflow-hidden gap-4 bg-sartorial-offWhite">
				<div className="relative w-full h-96">
					{slides.map((slide, index) => (
						<Link
							href="/all-products"
							key={slide.id}
							className={`absolute inset-0 transition-opacity duration-700 ${
								index === currentSlide
									? "opacity-100 z-10"
									: "opacity-0 z-0"
							}`}
						>
							<Image
								src={slide.image}
								alt={`Slide ${index + 1}`}
								fill
								priority={index === 0}
								className="object-cover"
							/>
						</Link>
					))}
				</div>

				<div className="flex gap-3 py-2">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`transition-all duration-300 rounded-full w-3 h-3 ${
								index === currentSlide
									? "bg-sartorial-darkGreen scale-110"
									: "bg-sartorial-lightGreen opacity-70"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default HeroCarousel;
