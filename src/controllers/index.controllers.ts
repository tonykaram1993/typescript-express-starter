import { Request, Response } from "express";

const get = (req: Request, res: Response) => {
  res.status(200);
  res.end();
};

export default {
  get,
};
