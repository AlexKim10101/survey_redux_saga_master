import { useEffect, useRef } from "react";
import { IPathname } from "../survey.types";

const usePrevLocation = (location: IPathname) => {
	const prevLocRef = useRef(location);

	useEffect(() => {
		prevLocRef.current = location;
	}, [location]);

	return prevLocRef.current;
};

export default usePrevLocation;
