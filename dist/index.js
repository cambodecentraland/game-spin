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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALID_PARCEL = void 0;
/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 *
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options
 */
const arena_1 = require("@colyseus/arena");
// Import arena config
const arena_config_1 = __importDefault(require("./arena.config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const decentraland_crypto_middleware_1 = require("decentraland-crypto-middleware");
const securityChecks_1 = require("./security/securityChecks");
const utils_1 = require("./utils");
exports.VALID_PARCEL = [1, 1];
const port = 8088; // default port to listen
const app = express_1.default();
app.use(cors_1.default({ origin: true }));
app.get('/check-validity', decentraland_crypto_middleware_1.express({ expiration: utils_1.VALID_SIGNATURE_TOLERANCE_INTERVAL_MS }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield securityChecks_1.runChecks(req, exports.VALID_PARCEL);
        return res.status(200).send({ valid: true, msg: 'Valid request' });
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .send({ valid: false, error: `Can't validate your request` });
    }
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
// Create and listen on 2567 (or PORT environment variable.)
arena_1.listen(arena_config_1.default);
//# sourceMappingURL=index.js.map