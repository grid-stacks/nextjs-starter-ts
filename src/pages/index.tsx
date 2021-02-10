import Head from "next/head";
import { FC } from "react";

import styles from "../styles/Home.module.css";
import Button from "@components/Button";

import { useTypedSelector, useAppDispatch } from "@store/store";
import { selectCount, countActions } from "@store/count.slice";

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const count = useTypedSelector(selectCount);

	const handleIncrement = () => dispatch(countActions.increment());
	const handleIncrementByNumber = () =>
		dispatch(countActions.incrementByAmount(3));

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to Next.js! Result: {count}
				</h1>
				<Button>Click me!</Button>
				<button onClick={handleIncrement}>Increase</button>
				<button onClick={handleIncrementByNumber}>
					Increase by Number
				</button>
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
