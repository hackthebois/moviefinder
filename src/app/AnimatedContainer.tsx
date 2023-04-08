"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";

const AnimatedContainer = ({ children }: { children: JSX.Element }) => {
	const [parent] = useAutoAnimate();
	return <div ref={parent}>{children}</div>;
};

export default AnimatedContainer;
