import axios from "axios";

export const getCharacters = async () => {
  try {
    const myArrayResults: any[] = [];
    let url = "https://swapi.py4e.com/api/people/";
    const response = await axios.get(url);
    const { count, results } = response.data;
    const pageLength = results.length;
    if (count === 0) return [];
    myArrayResults.push(...results);

    await Promise.all(
      Array.from({ length: Math.ceil(count / pageLength) }).map(
        async (_, index: number) => {
          if (index >= 1) {
            const response = await axios.get(`${url}?page=${index + 1}`);
            myArrayResults.push(...response.data.results);
          }
        }
      )
    );
    return myArrayResults;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export const getAllFilms = async () => {
  try {
    const response = await axios.get("https://swapi.py4e.com/api/films/");
    return response;
  } catch (error) {
    console.error("Error fetching films:", error);
    return null;
  }
};

export const getFilm = async (url: string | undefined) => {
  try {
    if (typeof url === "string") {
      const response = await axios.get(url);
      return response;
    }
    throw new Error("Invalid URL");
  } catch (error) {
    console.error("Error fetching film:", error);
    return null;
  }
};
