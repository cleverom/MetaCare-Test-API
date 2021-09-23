import express from 'express';
const router = express.Router();


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


export default router;
