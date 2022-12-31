export default async function getTitles(type) {
  const host = "moviesdatabase.p.rapidapi.com";
  const key = process.env.RAPIDAPI_KEY;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host
    }
  };

  const url = `https://${host}/titles?titleType=${type}&list=most_pop_movies&sort=year.decr&year=2022`;

  const response = await fetch(url, options as any).then(res => res.json());
  const results: any[] = response.results;
  const titles = results.map(result => result.titleText.text);

  return titles;
}