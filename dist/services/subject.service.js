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
class SubjectService {
    getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return subject_repositories_1.SubjectRepository.findAll();
        });
    }
    getSubjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return subject_repositories_1.SubjectRepository.findById(id);
        });
    }
    createSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return subject_repositories_1.SubjectRepository.create(data);
        });
    }
    updateSubject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield subject_repositories_1.SubjectRepository.findById(id);
            if (!subject)
                throw new Error('Subject not found');
            return subject_repositories_1.SubjectRepository.update(subject, data);
        });
    }
    deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subject = yield subject_repositories_1.SubjectRepository.findById(id);
            if (!subject)
                return false;
            return subject_repositories_1.SubjectRepository.delete(subject);
        });
    }
    getSubjects(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return subject_repositories_1.SubjectRepository.findAllWithFilters(filters);
        });
    }
}
exports.SubjectService = SubjectService;
