import { NextApiHandler } from "next";
import { allTypes } from "../../utils/types";
import getTitles from "../../utils/getTitles";

const handler: NextApiHandler = async (req, res) => {
  if (!req.query.type || !allTypes.includes(req.query.type as string)) {
    res.status(400).json({ error: "Invalid type" });
    return;
  }
  const type = req.query.type as string;
  switch (type) {
    case "movie":
      const titles = await getTitles(type);
      res.status(200).json(titles);
  }
};

export default handler;