import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://PedroMinderaAccount:KzWszmz6NEQr4XzP@cluster0.r3i7qbd.mongodb.net/todos?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todosCollection = db.collection("todos");

    const result = await todosCollection.updateOne(
      { _id: ObjectId(data.id) },
      { $set: { completed: true } }
    );

    console.log(result);

    client.close();

    res.status(201).json({ message: "Todo Updated" });
  }
}
