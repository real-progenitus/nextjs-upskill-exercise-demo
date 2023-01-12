import { MongoClient } from "mongodb";
import Head from "next/head";
import TodosList from "../components/TodosList";

const CompletedPage = ({ todos }) => {
  return (
    <>
      <Head>
        <title>Completed Todos</title>
        <meta name="description" content="Page for checking completed todos" />
      </Head>
      <div>
        <p>Completed</p>
        <TodosList todos={todos} />
      </div>
    </>
  );
};

export default CompletedPage;

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
  );

  const db = client.db();

  const todoCollection = db.collection("todos");

  const todos = await todoCollection.find({ completed: true }).toArray();

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
