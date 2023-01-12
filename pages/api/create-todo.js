import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todosCollection = db.collection("todos");

    const result = await todosCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Todo Inserted" });
  }
}
