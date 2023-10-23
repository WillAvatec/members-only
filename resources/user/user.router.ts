import * as express from "express";
import { updateMemberShipPost, updateMembershipGet } from "./user.controller";

const router = express.Router();

router.get("/update", updateMembershipGet);
router.post("/update", updateMemberShipPost);

export default router;
