"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var request_1 = require("../controllers/request");
/* GET all movie. */
// Routes
/**
 * @swagger
 * /api/movies:
 *  get:
 *    description: Use to request all movies
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', request_1.getMovie);
/* GET movie by id. */
/**
 * @swagger
 * /api/movies/{id}:
 *  get:
 *    description: Use to request movies by id
 *    parameters:
 *      - name: movie by id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', request_1.getMovieById);
/* GET all movie character. */
/**
 * @swagger
 * /api/movies/{id}/characters:
 *  get:
 *    description: Use to request all movies characters by id
 *    parameters:
 *      - name: character by id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id/characters', request_1.getMovieCharacter);
/* GET comment by id. */
/**
 * @swagger
 * /api/movies/{id}/comments:
 *  get:
 *    description: Use to request movie comments by id
 *    parameters:
 *      - name: comments by id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id/comments', request_1.getMovieComentById);
/* POST movie comment. */
/**
 * @swagger
 * /api/movies/{id}/comment:
 *    post:
 *      description: Use to create comments
 *      parameters:
 *      - name: comment
 *        in: body
 *        description: to make comments
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created comments
 */
router.post('/:id/comments', request_1.createMovieComent);
exports.default = router;
//# sourceMappingURL=index.js.map