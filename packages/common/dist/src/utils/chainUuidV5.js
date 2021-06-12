"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainUuidV5 = void 0;
const uuid_1 = require("uuid");
function chainUuidV5(namespace, ...rest) {
    if (!rest.length) {
        return namespace;
    }
    else {
        return uuid_1.v5(namespace, chainUuidV5(rest[0], ...rest.slice(1)));
    }
}
exports.chainUuidV5 = chainUuidV5;
//# sourceMappingURL=chainUuidV5.js.map