const Book = require("../models/Book");

const seedBooks = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    category: "Mystery",
    pages: 336,
    published: 2019,
    language: "English",
    rating: 4.3,
    description: "A gripping psychological thriller about truth, silence, and obsession.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    category: "Non-Fiction",
    pages: 320,
    published: 2018,
    language: "English",
    rating: 4.8,
    description: "Practical framework for building good habits and breaking bad ones.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    category: "Sci-Fi",
    pages: 688,
    published: 1965,
    language: "English",
    rating: 4.6,
    description: "Epic saga of politics, prophecy, and survival on Arrakis.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    category: "History",
    pages: 498,
    published: 2011,
    language: "English",
    rating: 4.5,
    description: "A concise history of humankind from ancient to modern eras.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    category: "Fantasy",
    pages: 310,
    published: 1937,
    language: "English",
    rating: 4.7,
    description: "A timeless adventure that begins in the Shire and crosses Middle-earth.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Memoir",
    category: "Biography",
    pages: 448,
    published: 2018,
    language: "English",
    rating: 4.7,
    description: "An intimate memoir tracing family, purpose, and public life.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781524763138-L.jpg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    category: "Fiction",
    pages: 279,
    published: 1813,
    language: "English",
    rating: 4.4,
    description: "A classic story of love, class, and character.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    category: "Fiction",
    pages: 328,
    published: 1949,
    language: "English",
    rating: 4.6,
    description: "A dystopian warning about totalitarian surveillance and control.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    genre: "Science Fiction",
    category: "Sci-Fi",
    pages: 369,
    published: 2011,
    language: "English",
    rating: 4.6,
    description: "An astronaut fights to survive alone on Mars.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg",
  },
  {
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    category: "Biography",
    pages: 352,
    published: 2018,
    language: "English",
    rating: 4.5,
    description: "A memoir of resilience, education, and personal reinvention.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Adventure",
    category: "Fiction",
    pages: 208,
    published: 1988,
    language: "English",
    rating: 4.3,
    description: "A fable about following your dreams and purpose.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    category: "Non-Fiction",
    pages: 252,
    published: 2020,
    language: "English",
    rating: 4.6,
    description: "Timeless lessons on wealth, behavior, and decision-making.",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
  },
];

async function ensureSeedBooks() {
  for (const seedBook of seedBooks) {
    const existing = await Book.findOne({ title: seedBook.title, author: seedBook.author });

    if (!existing) {
      await Book.create(seedBook);
      continue;
    }

    await Book.updateOne(
      { _id: existing._id },
      {
        $set: {
          genre: existing.genre || seedBook.genre,
          category: existing.category || seedBook.category,
          pages: existing.pages || seedBook.pages,
          published: existing.published || seedBook.published,
          language: existing.language || seedBook.language,
          description: existing.description || seedBook.description,
          rating: existing.rating || seedBook.rating,
          coverUrl: seedBook.coverUrl,
        },
      }
    );
  }

  console.log("Seed catalog ensured.");
}

async function getBooks(req, res) {
  const { search, category, genre } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = { $regex: `^${category}$`, $options: "i" };
  }

  if (genre) {
    filter.genre = { $regex: `^${genre}$`, $options: "i" };
  }

  const books = await Book.find(filter).sort({ createdAt: -1 });
  return res.json(books);
}

async function getBookById(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  return res.json(book);
}

async function createBook(req, res) {
  const book = await Book.create(req.body);
  return res.status(201).json(book);
}

async function updateBook(req, res) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  return res.json(book);
}

async function deleteBook(req, res) {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }
  return res.json({ message: "Book removed." });
}

module.exports = {
  ensureSeedBooks,
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
