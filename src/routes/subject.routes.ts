import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';
import { validateRequest } from '../middleware/validateRequest.middleware';

const router = Router();

router.get('/', validateRequest, (req, res) => SubjectController.get(req, res));
router.get('/:id', validateRequest, (req, res) => SubjectController.getById(req, res));
router.post('/', validateRequest, (req, res) => SubjectController.create(req, res));
router.put('/:id', validateRequest, (req, res) => SubjectController.update(req, res));
router.delete('/:id', validateRequest, (req, res) => SubjectController.remove(req, res));
router.delete("/:id/translations/:language_code", validateRequest, (req, res) =>SubjectController.removeTranslation(req, res));

export default router;
