"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const DemoCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const slides = [
		{
			id: 1,
			title: "GET UP TO 30% OFF",
			subtitle: "NEW ARRIVALS",
			description: "Introducing our latest collection of products",
			buttonText: "PLACE YOUR ORDER",
			image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
			bgColor: "from-emerald-800 to-emerald-400",
		},
		{
			id: 2,
			title: "SUMMER COLLECTION",
			subtitle: "TRENDING NOW",
			description: "Discover the hottest styles of the season",
			buttonText: "SHOP NOW",
			image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
			bgColor: "from-rose-800 to-rose-400",
		},
		{
			id: 3,
			title: "EXCLUSIVE DEALS",
			subtitle: "LIMITED TIME",
			description: "Don't miss out on our special offers",
			buttonText: "EXPLORE DEALS",
			image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
			bgColor: "from-blue-800 to-blue-400",
		},
	];

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, [slides.length]);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 5000);
	};

	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 5000); // Auto-advance every 5 seconds

		return () => clearInterval(interval);
	}, [isAutoPlaying, nextSlide]);

	return (
		<div className="relative w-full h-screen md:h-125 overflow-hidden bg-gray-900">
			{/* Slides */}
			<div className="relative w-full h-full">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 transition-opacity duration-700 ${
							index === currentSlide ? "opacity-100" : "opacity-0"
						}`}
					>
						<div
							className={`absolute inset-0 bg-linear-to-r ${slide.bgColor}`}
						>
							<div className="container mx-auto px-4 h-full">
								<div className="grid md:grid-cols-2 gap-5 md:gap-8 items-center h-full">
									{/* Left Content */}
									<div className="text-white space-y-6 z-10 pl-10 md:pl-20">
										<h1 className="text-5xl md:text-6xl font-light tracking-wider">
											{slide.title}
										</h1>
										<h2 className="text-3xl md:text-4xl font-light tracking-widest">
											{slide.subtitle}
										</h2>
										<p className="text-lg text-white/90">
											{slide.description}
										</p>
										<button className="border-2 border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors duration-300 tracking-wide font-medium">
											{slide.buttonText} →
										</button>
									</div>

									{/* Right Image */}
									<div className="relative h-full flex items-center justify-center">
										<div className="relative">
											<div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
											<Image
												height={100}
												width={100}
												src={slide.image}
												alt={slide.subtitle}
												className="relative w-80 h-80 object-cover rounded-full shadow-2xl"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-20"
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-6 h-6" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-20"
				aria-label="Next slide"
			>
				<ChevronRight className="w-6 h-6" />
			</button>

			{/* Dot Indicators */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`transition-all duration-300 ${
							index === currentSlide
								? "w-8 h-3 bg-white"
								: "w-3 h-3 bg-white/50 hover:bg-white/70"
						} rounded-full`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default DemoCarousel;
