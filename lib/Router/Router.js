"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Path = require("path");
const DataMessage_1 = require("../messages/DataMessage");
const request_validator_1 = require("@collate/request-validator");
const StatusCodes_1 = require("./StatusCodes");
const ErrorMessage_1 = require("../messages/ErrorMessage");
const RouteValidator = new request_validator_1.Validator();
class Router {
    constructor(path, logger) {
        this.RootPath = '/api/v1';
        this.basePath = path;
        this.router = Express.Router();
        this.requestBuilder = new request_validator_1.RequestBuilder();
        this.logger = logger;
    }
    getPath() {
        return Path.join(this.RootPath, this.basePath);
    }
    getRouter() {
        return this.router;
    }
    delete(path, handler, schema) {
        this.router.delete(path, this.validate(schema), handler);
    }
    get(path, handler, schema) {
        this.router.get(path, this.validate(schema), handler);
    }
    patch(path, handler, schema) {
        this.router.patch(path, this.validate(schema), handler);
    }
    post(path, handler, schema) {
        this.router.post(path, this.validate(schema), handler);
    }
    put(path, handler, schema) {
        this.router.put(path, this.validate(schema), handler);
    }
    validate(schema) {
        return (request, response, next) => {
            const requestSchema = schema;
            if (!this.isEmpty(request.body)) {
                this.requestBuilder.setBody(request.body);
            }
            if (!this.isEmpty(request.cookies)) {
                this.requestBuilder.setCookies(request.cookies);
            }
            if (!this.isEmpty(request.headers)) {
                this.requestBuilder.setHeaders(request.headers);
            }
            if (!this.isEmpty(request.params)) {
                this.requestBuilder.setParams(request.params);
            }
            if (!this.isEmpty(request.query)) {
                this.requestBuilder.setQuery(request.query);
            }
            const result = RouteValidator.validate(this.requestBuilder.build(), requestSchema);
            if (!result.isValid()) {
                this.sendError(response, result.errors(), StatusCodes_1.default.BadRequest);
            }
            if (next) {
                return next();
            }
            throw new Error('Missing route handler');
        };
    }
    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    sendError(response, message, status) {
        response
            .json(new ErrorMessage_1.default(message))
            .status(status);
    }
    sendData(response, data, status) {
        response
            .json(new DataMessage_1.default(data))
            .status(status);
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map