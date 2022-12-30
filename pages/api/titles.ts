import { NextApiHandler } from "next";
import { allTypes } from "../../utils/types";

const handler: NextApiHandler = async (req, res) => {
  if (!allTypes.includes(req.body.type)) {
    res.status(400).json({ error: "Invalid type" });
    return;
  }
  const host = "moviesdatabase.p.rapidapi.com";
  const key = process.env.RAPIDAPI_KEY;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host
    }
  };

  const url = `https://${host}/titles?titleType=${req.query.type}&list=most_pop_movies&sort=year.decr&year=2022`;

  const response = await fetch(url, options as any).then(res => res.json());

  res.status(200).json(response);
};

export default handler;