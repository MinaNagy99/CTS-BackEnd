import { Router } from "express";
import { getArabicFile, getEnglishFile } from "./Language.controller.js";

const languageRoute = Router()

languageRoute.route('/ar').get(getArabicFile)
languageRoute.route('/en').get(getEnglishFile)



export default languageRoute