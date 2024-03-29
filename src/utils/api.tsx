import axios from "axios";

export const getCharacters = async () => {
  const myArrayResults: any[] = [];
  let url = "https://swapi.py4e.com/api/people/";
  await axios({
    method: "GET",
    url: `${url}`,
  }).then(async (response) => {
    const { count, results } = response.data;
    const pageLength = results.length;
    if (count === 0) return [];
    myArrayResults.push(results);
    await Promise.all(
      Array.from({ length: Math.ceil(count / pageLength) }).map(
        async (n, index: number) => {
          if (index >= 1) {
            await axios({
              method: "GET",
              url: `${url}?page=${index + 1}`,
            }).then((response) => {
              myArrayResults.push(response.data.results);
            });
          }
        }
      )
    );
  });
  return myArrayResults;
};

export const getAllFilms = async () => {
  const request = await axios({
    method: "GET",
    url: "https://swapi.py4e.com/api/films/",
  });
  return request;
};

export const getFilm = async (url: string | undefined) => {
  if (typeof url === "string") {
    const request = await axios({
      method: "GET",
      url,
    });
    return request;
  }
};
