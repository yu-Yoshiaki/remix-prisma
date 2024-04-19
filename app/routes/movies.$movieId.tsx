/* eslint-disable jsx-a11y/media-has-caption */
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getMovie } from "~/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.movieId, "Missing contactId param");
  const movie = await getMovie(params.movieId);
  return json({ movie });
};

const MoviePage = () => {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Movie</h1>

      <video controls muted={true}>
        <source src={movie.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MoviePage;
