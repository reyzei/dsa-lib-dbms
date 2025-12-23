import books from "./books.js";

export default function handler(req, res) {
  const { id } = req.body;
  const b = books.find(x => x.book_id === id);

  if (!b || b.is_available)
    return res.status(400).json({ error: "Cannot return" });

  b.is_available = true;
  res.json({ success: true });
}
