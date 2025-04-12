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
exports.SubjectRepository = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
exports.SubjectRepository = {
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('SubjectTranslation model:', models_1.default.SubjectTranslation);
        return yield models_1.default.Subject.findAll({ include: [{ model: models_1.default.SubjectTranslation, as: 'translations' }] });
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('SubjectTranslation model:', models_1.default.SubjectTranslation);
        return yield models_1.default.Subject.findByPk(id, { include: [{ model: models_1.default.SubjectTranslation, as: 'translations' }] });
    }),
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('SubjectTranslation model:', models_1.default.SubjectTranslation);
        return yield models_1.default.Subject.create(data, {
            include: [{ model: models_1.default.SubjectTranslation, as: 'translations' }],
        });
    }),
    update: (subject, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield subject.update(data);
    }),
    delete: (subject) => __awaiter(void 0, void 0, void 0, function* () {
        yield subject.destroy();
        return true;
    }),
    findAllWithFilters: (_a) => __awaiter(void 0, [_a], void 0, function* ({ page, limit, search, sortBy, order, }) {
        const offset = (page - 1) * limit;
        const { count, rows } = yield models_1.default.Subject.findAndCountAll({
            where: search
                ? {
                    examType: {
                        [sequelize_1.Op.like]: `%${search}%`,
                    },
                }
                : undefined,
            include: [{ model: models_1.default.SubjectTranslation, as: 'translations' }],
            order: [[sortBy, order]],
            limit,
            offset,
        });
        return {
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                pageSize: limit,
            },
        };
    })
};
