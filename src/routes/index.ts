import express from 'express';
const router = express.Router();
import {getMovie, getMovieById, getMovieComentById, createMovieComent, getMovieCharacter} from '../controllers/request'


/* GET all movie. */
router.get('/', getMovie)

/* GET movie by id. */
router.get('/:id', getMovieById)


/* GET all movie character. */

router.get('/:id/characters', getMovieCharacter)


/* GET comment by id. */

router.get('/:id/comments', getMovieComentById)



/* POST movie comment. */

router.post('/:id/comments', createMovieComent)

export default router;
