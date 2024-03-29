import axios from "axios";

/* export const getCharacters = async (indexPage: number) => {
  const request = await axios({
    method: "GET",
    url: `https://swapi.py4e.com/api/people/?page=${indexPage + 1}`,
  });
  return request;
}; */

export const getCharacters = async () => {
  const myArrayResults: any[] = [];
  let url = "https://swapi.py4e.com/api/people/";
  const request = await axios({
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
          //console.log(index);
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

export const getDetails = async (id: string | undefined) => {
  const request = await axios({
    method: "GET",
    url: `https://swapi.py4e.com/api/people/${id}`,
  });
  return request;
};

export const getNext = async (id: string | undefined) => {
  if (typeof id === "string") {
    const next = parseInt(id) === 16 ? parseInt(id) + 2 : parseInt(id) + 1;
    const request = await axios({
      method: "GET",
      url: `https://swapi.py4e.com/api/people/${next}`,
    });
    return request;
  }
};
export const getPrevious = async (id: string | undefined) => {
  if (typeof id === "string") {
    const previous = parseInt(id) === 18 ? parseInt(id) - 2 : parseInt(id) - 1;
    const request = await axios({
      method: "GET",
      url: `https://swapi.py4e.com/api/people/${previous}`,
    });
    return request;
  }
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

export const getResultByQuery = async (searchQuery: string) => {
  if (typeof searchQuery === "string") {
    const request = await axios({
      method: "GET",
      url: `https://swapi.py4e.com/api/people/?search=${searchQuery}`,
    });
    return request;
  }
};

/* const getPeople = async () => {
  const url = "https://swapi.py4e.com/api/people/";

  const res = await fetch(url);

  const { count, results } = await res.json();

  // zero case must be handled separately
  // otherwise we end up dividing by 0
  if (count === 0) return [];

  const pageLength = results.length;

  const pages = [
    results, // first page
    ...(await Promise.all(
      [
        // -1 because first page already fetched
        ...new Array(Math.ceil(count / pageLength) - 1).keys(),
      ].map(async (n) => {
        // +1 because zero-indexed
        // +1 because first page already fetched
        const page = n + 2;

        const res = await fetch(`${url}?page=${page}`);

        return (await res.json()).results;
      })
    )),
  ];

  return pages.flat();
};

getPeople().then(console.log);
 */
