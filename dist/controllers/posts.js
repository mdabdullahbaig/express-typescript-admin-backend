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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.getPostById = exports.getPosts = exports.createPost = void 0;
// Create Post
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createPost = createPost;
// Get All Posts
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPosts = getPosts;
// Get Post By Id
const getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPostById = getPostById;
// Update Post By Id
const updatePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updatePostById = updatePostById;
// Delete Post By Id
const deletePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deletePostById = deletePostById;
