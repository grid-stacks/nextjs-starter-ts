import Head from "next/head";
import { FC } from "react";
import styles from "../styles/Home.module.css";

const Home: FC = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Next.js!</h1>
			</main>

			<footer className={styles.footer}>
				Developed by DHN Chandan under{" "}
				<a
					href="https://github.com/grid-stacks"
					target="_blank"
					rel="noopener noreferrer"
				>
					- Grid Stacks
				</a>
			</footer>
		</div>
	);
};

export default Home;
