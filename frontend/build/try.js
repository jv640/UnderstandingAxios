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
const axios_1 = __importDefault(require("axios"));
const timeout = 10000;
const logSuccessfulResponse = (response) => {
    console.log('Inside log success function');
    const { status, statusText } = response;
    const { method, url } = response.config;
    console.log(`[${method === null || method === void 0 ? void 0 : method.toUpperCase()}]${url}`, {
        status,
        statusText,
    });
    return response;
};
const logFailedResponse = (error) => {
    var _a, _b;
    console.log('Inside log failed function');
    const { status, statusText, headers } = error === null || error === void 0 ? void 0 : error.response;
    const { method, url } = error.config;
    console.log(`[${method.toUpperCase()}]${url}`, {
        status,
        statusText,
        body: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data,
    });
    throw new Error(JSON.stringify((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data));
    // return error?.response
};
function post(url, requestHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            // input1: 'one input',
            input2: 'two input'
        };
        const config = {
            method: 'post',
            url,
            headers: requestHeaders,
            timeout,
            data: payload,
        };
        console.log("making post call with payload", payload);
        const res = (0, axios_1.default)(config).then(logSuccessfulResponse, logFailedResponse);
        return res;
    });
}
function saveCredential() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `http://localhost:3000/post-call`;
            const headers = {
                'Content-Type': 'application/json',
            };
            const issuerServiceResponse = yield post(url, headers);
            console.log('logging in try block inside save credential');
            return issuerServiceResponse.data;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(`failed storing credential in issuer-service: ${JSON.stringify(error.message)}`);
        }
    });
}
var newfunc = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const final = yield saveCredential();
            console.log("logging in try block in main function", final);
        }
        catch (error) {
            console.log("logging in catch block in main function", error.message);
        }
    });
}();
