import { FC, ReactNode } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import getStore from "@store/store";

import "../styles/globals.css";
export interface MyAppProps {
	Component: ReactNode;
	pageProps: object;
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Provider store={getStore}>
			<Component {...pageProps} />;
		</Provider>
	);
};

export default MyApp;
