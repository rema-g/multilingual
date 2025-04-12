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
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const subject_service_1 = require("../services/subject.service");
const subjectService = new subject_service_1.SubjectService();
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'DESC' } = req.query;
        const filters = {
            search: search.toString(),
            sortBy: sortBy.toString(),
            order: order.toString().toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
            page: parseInt(page.toString(), 10),
            limit: parseInt(limit.toString(), 10),
        };
        const result = yield subjectService.getSubjects(filters);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching subjects', error: err });
    }
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield subjectService.getSubjectById(+req.params.id);
        if (!data) {
            res.status(404).json({ message: 'Subject not found' });
            return;
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching subject', error: err });
    }
});
exports.getById = getById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Incoming request body:', req.body);
        const created = yield subjectService.createSubject(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating subject', error: err });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield subjectService.updateSubject(+req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ message: 'Subject not found' });
            return;
        }
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating subject', error: err });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield subjectService.deleteSubject(+req.params.id);
        if (!success) {
            res.status(404).json({ message: 'Subject not found' });
            return;
        }
        res.status(200).json({ message: 'Subject deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting subject', error: err });
    }
});
exports.remove = remove;
