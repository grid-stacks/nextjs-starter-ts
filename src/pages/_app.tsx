import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";

import { useStore } from "@store/store";
// import withRedux from "next-redux-wrapper";
// import getStore, { useStore } from "@store/store";

import "../styles/globals.css";

export interface MyAppProps {
	Component: ReactNode;
	store: Store;
	pageProps: object;
}

const MyApp = ({ Component, pageProps }) => {
	const store = useStore();

	return (
		<Provider store={store}>
			<Component {...pageProps} />;
		</Provider>
	);
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
	console.log(ctx);
	const pageProps = Component.getInitialProps
		? await Component.getInitialProps(ctx)
		: {};

	//Anything returned here can be accessed by the client
	return { pageProps: pageProps };
};

// const makeStore = () => getStore;

// export default withRedux(makeStore)(MyApp);

export default MyApp;
