"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieCharacter = exports.getMovieComentById = exports.createMovieComent = exports.getMovieById = exports.getMovie = void 0;
var unescape_js_1 = __importDefault(require("unescape-js"));
var models_1 = __importDefault(require("../models"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var Utilities_1 = require("../Utilities");
var moviesUrl = 'https://swapi.dev/api/films';
var Comment = models_1.default.comments;
function getMovies() {
    return (0, node_fetch_1.default)(moviesUrl);
}
function getMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var movies, films, retrieved, x, count, temp, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, getMovies()];
                case 1:
                    movies = _a.sent();
                    return [4 /*yield*/, movies.json()];
                case 2:
                    films = _a.sent();
                    retrieved = [];
                    x = 0;
                    _a.label = 3;
                case 3:
                    if (!(x < films.results.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Comment.count({ where: { 'movie_id': x + 1 } })];
                case 4:
                    count = _a.sent();
                    temp = {
                        id: films.results[x].episode_id,
                        name: films.results[x].title,
                        comment_count: count,
                        summary: (0, unescape_js_1.default)(films.results[x].opening_crawl)
                    };
                    retrieved.push(temp);
                    _a.label = 5;
                case 5:
                    x++;
                    return [3 /*break*/, 3];
                case 6:
                    res.send(retrieved);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    res.send(error_1.message);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getMovie = getMovie;
function getMovieById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, movies, films, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getMovies()];
                case 2:
                    movies = _a.sent();
                    return [4 /*yield*/, movies.json()];
                case 3:
                    films = _a.sent();
                    result = films.results[id + 1];
                    if (result == null || result == undefined) {
                        res.status(404).send({
                            message: "Movie not found!"
                        });
                        return [2 /*return*/];
                    }
                    res.send(result);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    res.status(500).send("An error occurred while retrieving the movie.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getMovieById = getMovieById;
function createMovieComent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var movieId, ipAddress, comment;
        return __generator(this, function (_a) {
            if (!req.body.message) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
                return [2 /*return*/];
            }
            movieId = parseInt(req.params.id);
            ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
            comment = {
                message: req.body.message,
                movie_id: movieId,
                ip_address: ipAddress
            };
            // Save Comment in the database
            Comment.create(comment)
                .then(function (data) {
                res.send(data);
            })
                .catch(function (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Comment."
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.createMovieComent = createMovieComent;
function getMovieComentById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, comments, payload, x, object;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, Comment.findAll({ where: { 'movie_id': id } })];
                case 1:
                    comments = _a.sent();
                    comments.sort(function (a, b) { return b.id - a.id; });
                    payload = [];
                    for (x = 0; x < comments.length; x++) {
                        object = {
                            "comment": comments[x].message,
                            "ip address": comments[x].ip_address,
                            "date/time": comments[x].createdAt
                        };
                        payload.push(object);
                    }
                    res.send(payload);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getMovieComentById = getMovieComentById;
function getMovieCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, sortOrder, gender, movie, movies, characters, actors, x, artistes, artiste, filtered, actorsMeta, filteredMeta, payload, filteredPayload, characterList, filteredResponse, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    sortOrder = req.query.sortBy;
                    gender = req.query.gender;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, getMovies()];
                case 2:
                    movie = _a.sent();
                    return [4 /*yield*/, movie.json()];
                case 3:
                    movies = _a.sent();
                    characters = movies.results[id - 1].characters;
                    actors = [];
                    x = 0;
                    _a.label = 4;
                case 4:
                    if (!(x < characters.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, node_fetch_1.default)(characters[x])];
                case 5:
                    artistes = _a.sent();
                    return [4 /*yield*/, artistes.json()];
                case 6:
                    artiste = _a.sent();
                    actors.push(artiste);
                    _a.label = 7;
                case 7:
                    x++;
                    return [3 /*break*/, 4];
                case 8:
                    if (sortOrder == "namesAscending") {
                        actors.sort(function (a, b) {
                            return (0, Utilities_1.compareObjectsAscending)(a, b, 'name');
                        });
                    }
                    else if (sortOrder == "namesDescending") {
                        actors.sort(function (a, b) {
                            return (0, Utilities_1.compareObjectsDescending)(a, b, 'name');
                        });
                    }
                    else if (sortOrder == "heightAscending") {
                        actors.sort(function (a, b) { return a.height - b.height; });
                    }
                    else if (sortOrder == "heightDescending") {
                        actors.sort(function (a, b) { return b.height - a.height; });
                    }
                    filtered = [];
                    if (gender == "male") {
                        filtered = actors.filter(function (actor) { return actor.gender == "male"; });
                    }
                    else if (gender == "female") {
                        filtered = actors.filter(function (actor) { return actor.gender == "female"; });
                    }
                    actorsMeta = (0, Utilities_1.getMetadata)(actors);
                    filteredMeta = (0, Utilities_1.getMetadata)(filtered);
                    payload = actors.map(function (actor) { return actor.name; });
                    filteredPayload = filtered.map(function (actor) { return actor.name; });
                    characterList = { metaData: actorsMeta, characters: payload };
                    filteredResponse = { metaData: filteredMeta, characters: filteredPayload };
                    if (gender == undefined) {
                        res.send(characterList);
                    }
                    else {
                        res.send(filteredResponse);
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _a.sent();
                    res.send(error_3.message);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.getMovieCharacter = getMovieCharacter;
//# sourceMappingURL=request.js.map