import { MongoClient } from "mongodb";
import Head from "next/head";
import TodosList from "../components/TodosList";
import styles from "../styles/Home.module.css";

export default function Home({ todos }) {
  console.log(todos);
  return (
    <>
      <Head>
        <title>Upskill Example App</title>
        <meta name="description" content="Mindera upskill course for NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TodosList todos={todos} />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
  );

  const db = client.db();

  const todoCollection = db.collection("todos");

  const todos = await todoCollection.find({ completed: false }).toArray();

  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      })),
    },
  };
};
