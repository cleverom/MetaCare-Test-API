"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// /**
//  * @swagger
//  * paths:
//  *  /:
//  *   get:
//  *     description: Get all swapi
//  *     responses:
//  *       200:
//  *         description: Success
//  *
//  */
/* GET home page. */
router.get('/', function (req, res) {
    return res.status(200).json('Welcome to FinTrack');
});
exports.default = router;
