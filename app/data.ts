export const movies = [
  { title: "The Shawshank Redemption", year: 1994, id: 1, src: "./video.mp4" },
  { title: "The Godfather", year: 1972, id: 2, src: "./video.mp4" },
  { title: "The Dark Knight", year: 2008, id: 3, src: "./video.mp4" },
  { title: "The Godfather: Part II", year: 1974, id: 4, src: "./video.mp4" },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    id: 5,
    src: "./video.mp4",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    id: 6,
    src: "./video.mp4",
  },
  { title: "Schindler's List", year: 1993, id: 7, src: "./video.mp4" },
  { title: "Inception", year: 2010, id: 8, src: "./video.mp4" },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    id: 9,
    src: "./video.mp4",
  },
];

export const getMovies = async () => {
  return movies;
};

export const getMovie = async () => {
  const url = process.env.WORKERS_URL + "/mov_hts-samp005.mp4";
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Auth-Key": process.env.AUTH_KEY_SECRET || "",
    },
  });
  const json = await res.json();
  return json;
};
