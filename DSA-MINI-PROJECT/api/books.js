let books = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { id, title } = req.query;

    if (id) {
      const b = books.find(x => x.book_id == id);
      return b ? res.json(b) : res.status(404).json({ error: "Not found" });
    }

    if (title) {
      return res.json(
        books.filter(b =>
          b.title.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    return res.json(books);
  }

  if (req.method === "POST") {
    const book = req.body;
    if (books.find(b => b.book_id === book.book_id)) {
      return res.status(400).json({ error: "Duplicate ID" });
    }
    book.is_available = true;
    books.push(book);
    return res.json({ success: true });
  }

  if (req.method === "DELETE") {
    const id = Number(req.query.id);
    books = books.filter(b => b.book_id !== id);
    return res.json({ success: true });
  }

  res.status(405).end();
}
