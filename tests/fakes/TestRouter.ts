import Router from "../../src/Router/Router";
import { Request, Response } from "express";
import { ILogger } from "@collate/logging";
import FakeLogger from "./FakeLogger";
import StatusCodes from "../../src/Router/StatusCodes";
import { ValidationSchema } from "@collate/request-validator";

const logger : ILogger = new FakeLogger();

export default class TestRouter extends Router {
	constructor() {
		super("/test", logger);
	}

	public setup(): void {
		this.get('/a', (request: Request, response: Response): void => {
			response.send("test").status(StatusCodes.OK);
		}, new ValidationSchema({
			types: {
				request: {
					body: {
						type: "string",
						required: true
					}
				}
			}
		}));
	}
}