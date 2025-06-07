const movies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    cast: [
      { id: 101, name: "Leonardo DiCaprio" },
      { id: 102, name: "Joseph Gordon-Levitt" }
    ],
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    description:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent...",
    cast: [
      { id: 103, name: "Christian Bale" },
      { id: 104, name: "Heath Ledger" }
    ],
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
  }
];

export default movies;
