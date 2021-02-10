import Head from "next/head";
import { FC } from "react";

import { useDispatch } from "react-redux";
import { useInjectSaga } from "redux-injectors";

import styles from "../styles/Home.module.css";
import Button from "@components/Button";

import { useTypedSelector, useAppDispatch } from "@store/store";
import {
	selectCount,
	countActions,
	fetchTodos,
} from "@store/example/count/count.slice";
import {
	watchIncrementAsync,
	watchDecrementAsync,
	countComponentSaga,
} from "@store/example/count/count.sagas";

import { useGetTodoQuery } from "@store/example/post/post.slice";

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const dispatch_ = useDispatch();
	const count = useTypedSelector(selectCount);

	const { data, error, isLoading } = useGetTodoQuery(2);

	// Activating count sagas
	useInjectSaga({ key: "countIncrement", saga: watchIncrementAsync }); // Calling single saga
	useInjectSaga({ key: "countDecrement", saga: watchDecrementAsync }); // Calling single saga
	useInjectSaga({ key: "countAll", saga: countComponentSaga }); // Calling multiple sagas

	const handleIncrement = () => dispatch(countActions.increment());
	const handleIncrementByNumber = () => {
		dispatch(countActions.incrementByAmount(3));
		dispatch_(fetchTodos(5));
	};

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

				<br />
				<hr />
				<br />

				{isLoading && <div>Loading...</div>}
				{error && <p>{error}</p>}
				{data && (
					<div>
						<h2>RTK Query</h2>
						Todo: {data && data.title} | Completed:{" "}
						{data && data.completed.toString()}
					</div>
				)}
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
