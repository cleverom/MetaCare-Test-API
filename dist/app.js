"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var models_1 = __importDefault(require("./models"));
var index_1 = __importDefault(require("./routes/index"));
// swagger definitions
var swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'MetaCare API',
            version: '1.0.0',
            description: 'API for movies and comments with statistics',
        },
        host: 'localhost:4000',
        basePath: '/api/movies',
        components: {
            securitySchemes: {
                BasicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: {
            basicAuth: []
        },
        openapi: "3.0.0",
    },
    apis: [__dirname + "/routes/index.js"],
};
dotenv_1.default.config();
var app = (0, express_1.default)();
models_1.default.sequelize.sync({ force: true }).then(function () {
    console.log("Drop and re-sync db.");
});
// console.log(swaggerDocs);
// view engine setup
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/api/movies', index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
});
exports.default = app;
//# sourceMappingURL=app.js.map