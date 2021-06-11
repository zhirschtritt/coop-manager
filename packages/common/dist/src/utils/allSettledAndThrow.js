"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSettledAndThrow = void 0;
async function allSettledAndThrow(promises) {
    const results = await Promise.allSettled(promises);
    for (const result of results) {
        if (isPromiseRejection(result)) {
            throw new Error(result.reason);
        }
    }
    return results.map((r) => r.value);
}
exports.allSettledAndThrow = allSettledAndThrow;
function isPromiseRejection(promiseResult) {
    return promiseResult.status === 'rejected';
}
//# sourceMappingURL=allSettledAndThrow.js.map