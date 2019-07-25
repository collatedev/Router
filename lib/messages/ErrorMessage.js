"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class ErrorMessage extends Message_1.default {
    constructor(error) {
        super(false, null);
        this.error = error;
    }
}
exports.default = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map