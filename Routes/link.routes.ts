import express, { Router, Request, Response } from "express";
import { CustomRequest } from "../Models/global.model";
import { BodyCreateLink, ShortendLink } from "../Models/link.model";
import fs from "fs";
import { getLink, getRandomString } from "../Functions/global.functions";
const router: Router = express.Router();

// [POST] Route 1: ( /link/create ) => create new short link
router.post(
  "/create",
  async (request: CustomRequest<BodyCreateLink>, response: Response) => {
    const { long_url } = request.body;

    // Get Already Created Links From Data
    const links =
      (await new Promise<ShortendLink[]>((resolve, reject) => {
        fs.readFile("Data/links.json", "utf-8", (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(JSON.parse(data));
        });
      }).catch((error) => {
        console.log("File Read Error: ", error);
        response.status(500).json({ message: "INTERNAL SERVER ERROR" });
        return;
      })) ?? [];

    //   generating random string while current string exist in created links
    let short_url = getRandomString(7);
    while (getLink(short_url, links) !== null) {
      short_url = getRandomString(7);
    }

    // Storing new shortened link in data
    const createdLink = await new Promise<ShortendLink>((resolve, reject) => {
      const newLink: ShortendLink = {
        long_url,
        short_url,
        created_at: new Date().getTime(),
      };

      fs.writeFile(
        "Data/links.json",
        JSON.stringify([...links, newLink]),
        "utf8",
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(newLink);
        }
      );
    }).catch(error => {
        console.log("Create ERROR", error)
        response.status(500).json({message: "INTERNAL SERVER ERROR"})
    });
    response.json({ data: createdLink });
  }
);

export default router;
