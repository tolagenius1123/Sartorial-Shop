import React, { SVGProps } from "react";

interface UserIconProps extends SVGProps<SVGSVGElement> {
	className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ className = "", ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="none"
		className={className}
		{...props}
	>
		<path
			fill="currentColor"
			d="M3.85 15.1q1.275-.975 2.85-1.537A9.8 9.8 0 0 1 10 13q1.725 0 3.3.563 1.575.564 2.85 1.537a7.7 7.7 0 0 0 1.363-2.325A7.8 7.8 0 0 0 18 10q0-3.325-2.337-5.663T10 2Q6.674 2 4.337 4.338T2 10q0 1.474.488 2.775T3.85 15.1M10 11q-1.475 0-2.488-1.012T6.5 7.5q0-1.476 1.013-2.488T10 4t2.488 1.013T13.5 7.5q0 1.474-1.012 2.488Q11.478 11.002 10 11m0 9a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137Q1.575 15.725.788 13.9A9.8 9.8 0 0 1 0 10q0-2.074.788-3.9a10.1 10.1 0 0 1 2.137-3.175Q4.273 1.575 6.1.788A9.7 9.7 0 0 1 10 0q2.073 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.348 1.35 2.138 3.175A9.7 9.7 0 0 1 20 10a9.8 9.8 0 0 1-.788 3.9 10 10 0 0 1-2.137 3.175 10.2 10.2 0 0 1-3.175 2.138A9.7 9.7 0 0 1 10 20"
		></path>
	</svg>
);

export default UserIcon;
