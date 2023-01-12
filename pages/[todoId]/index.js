import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { markAsDone } from "../../lib/mark-as-done";

const TodoDetailPage = ({ todo }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{todo.title}</title>
        <meta name="description" content={`${todo.description}`} />
      </Head>
      <div>
        <div>
          This page will give you the full details of the todo with id:{" "}
          {todo.id}
        </div>
        <div>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <button
            onClick={
              todo.completed ? () => {} : () => markAsDone(router, todo.id)
            }
          >
            {todo.completed ? "Done" : "Mark as Done"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
  );

  const db = client.db();

  const todoCollection = db.collection("todos");

  const todos = await todoCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: todos.map((todo) => ({
      params: { todoId: todo._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const todoId = context.params.todoId;

  const client = await MongoClient.connect(
    "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
  );

  const db = client.db();

  const todoCollection = db.collection("todos");

  const selectedTodo = await todoCollection.findOne({ _id: ObjectId(todoId) });

  client.close();

  return {
    props: {
      todo: {
        id: selectedTodo._id.toString(),
        title: selectedTodo.title,
        description: selectedTodo.description,
        completed: selectedTodo.completed,
      },
    },
    revalidate: 1,
  };
};
