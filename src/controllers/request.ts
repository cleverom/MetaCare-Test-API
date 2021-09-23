import express, { Request, Response } from 'express';
import unescape from 'unescape-js';
import db from "../models";
import fetch from 'node-fetch';
import {  compareObjectsAscending, compareObjectsDescending, getMetadata } from '../Utilities'
const moviesUrl = 'https://swapi.dev/api/films';
const Comment = db.comments;



function getMovies() {
  return fetch(moviesUrl);
}

export async function getMovie(req: Request, res: Response) {
  try {
    let movies: Record<string, any> = await getMovies()
    let films = await movies.json()
    let retrieved = []

    for(let x = 0; x < films.results.length; x++) {
      
      let count = await Comment.count({ where: {'movie_id': x + 1} });

    let temp = {
        id: films.results[x].episode_id,
        name: films.results[x].title,
        comment_count: count,
        summary: unescape(films.results[x].opening_crawl)         
    }
    retrieved.push(temp);
 }
 res.send(retrieved);
}catch(error: any) {
    res.send(error.message);
}
}
export async function getMovieById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
      const movies: Record<string, any> = await getMovies()
      const films = await movies.json()
      
      const result = films.results[id + 1];  
      if(result == null || result == undefined) {
        res.status(404).send({
          message: "Movie not found!"
        });
        return;
      }
      res.send(result);
  }catch(error) {
      res.status(500).send("An error occurred while retrieving the movie.");
  }
}

export async function createMovieComent (req: Request, res: Response) {
  if (!req.body.message) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const movieId = parseInt(req.params.id);
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;

  // Create a Comment
  const comment = {
    message: req.body.message,
    movie_id: movieId,
    ip_address: ipAddress
  };

  // Save Comment in the database
  Comment.create(comment)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: { message: any; }) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
}
export async function getMovieComentById (req: Request, res: Response) {
  const id = parseInt(req.params.id);
    const comments = await Comment.findAll({ where: {'movie_id': id } });

    comments.sort((a: any, b: any) => b.id - a.id);

    const payload = [];
    for(let x = 0; x < comments.length; x++) {
        
        const object = {
          "comment": comments[x].message,
          "ip address": comments[x].ip_address,
          "date/time": comments[x].createdAt
        }

        payload.push(object);
    }
    res.send(payload);
}


export async function getMovieCharacter(req: { params: { id: string; }; query: { sortBy: any; gender: any; }; }, res: { send: (arg0: { metaData: { "Number of Characters": any; "Total height in centimetres": number; "Total height in feet and inches": string; }; characters: any[] | any[]; }) => void; }) {
  const id = parseInt(req.params.id);
    const sortOrder = req.query.sortBy;
    const gender = req.query.gender;

 try {
    let movie: Record<string, any> = await getMovies()
    let movies = await movie.json()
    let characters = movies.results[id - 1].characters;

    const actors:Record<string, any>[] = [];

    for(let x = 0; x < characters.length; x++) {
        let artistes = await fetch(characters[x]);
        let artiste: any = await artistes.json();
        actors.push(artiste);
    }

    if(sortOrder == "namesAscending") {
        actors.sort((a, b) => {
            return compareObjectsAscending(a, b, 'name')
          })
    } else if(sortOrder == "namesDescending") {
        actors.sort((a, b) => {
            return compareObjectsDescending(a, b, 'name')
          })
    } else if(sortOrder == "heightAscending") {
        actors.sort((a:any, b:any) => a.height - b.height)
    } else if(sortOrder == "heightDescending") {
        actors.sort((a:any, b:any) => b.height - a.height)
    }

    let filtered: any = [];

    if(gender == "male") {
        filtered = actors.filter(actor => actor.gender == "male");
    } else if(gender == "female") {
        filtered = actors.filter(actor => actor.gender == "female");
    }

    const actorsMeta = getMetadata(actors);
    const filteredMeta = getMetadata(filtered);

    const payload = actors.map(actor => { return actor.name});
    const filteredPayload = filtered.map((actor: { name: any; }) => { return actor.name});

    const characterList = { metaData: actorsMeta, characters: payload };

    const filteredResponse = { metaData: filteredMeta, characters: filteredPayload};

    if(gender == undefined) {
        res.send(characterList);
    } else { res.send(filteredResponse); }
 } catch (error:any) {
     res.send(error.message);
 }
}

