import books from "./books.js";

export default function handler(req, res) {
  const { id } = req.body;
  const b = books.find(x => x.book_id === id);

  if (!b || !b.is_available)
    return res.status(400).json({ error: "Cannot issue" });

  b.is_available = false;
  res.json({ success: true });
}
