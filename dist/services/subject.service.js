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
exports.SubjectService = void 0;
const subject_repositories_1 = require("../repositories/subject.repositories");
const HttpError_1 = require("../utils/HttpError");
const message_1 = require("../errors/message");
const subjectRepository = new subject_repositories_1.SubjectRepository();
class SubjectService {
    getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectRepository.findAll();
        });
    }
    getSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectRepository.findById(id);
        });
    }
    createSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectRepository.create(data);
        });
    }
    updateSubject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield subjectRepository.findById(id);
            if (!subject)
                throw new HttpError_1.HttpError(message_1.SubjectErrors.NOT_FOUND, 404);
            return subjectRepository.update(subject, data);
        });
    }
    deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield subjectRepository.findById(id);
            if (!subject)
                throw new HttpError_1.HttpError(message_1.SubjectErrors.NOT_FOUND, 404);
            return subjectRepository.delete(subject);
        });
    }
    getSubjects(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return subjectRepository.findAllWithFilters(filters);
        });
    }
}
exports.SubjectService = SubjectService;
