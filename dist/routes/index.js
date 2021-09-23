"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var request_1 = require("../controllers/request");
/* GET all movie. */
router.get('/', request_1.getMovie);
/* GET movie by id. */
router.get('/:id', request_1.getMovieById);
/* GET all movie character. */
router.get('/:id/characters', request_1.getMovieCharacter);
/* GET comment by id. */
router.get('/:id/comments', request_1.getMovieComentById);
/* POST movie comment. */
router.post('/:id/comments', request_1.createMovieComent);
exports.default = router;
