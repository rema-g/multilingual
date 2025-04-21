import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';
import { validateQuery } from '../middleware/validateQuery.middleware';
import { validateBody } from '../middleware/validateBody.middleware';
// import { wrapController } from '../utils/wrapController';

const router = Router();

router.get('/', validateQuery, (req, res) => SubjectController.get(req, res));
router.get('/:id', validateQuery, (req, res) => SubjectController.getById(req, res));
router.post('/', validateBody, (req, res) => SubjectController.create(req, res));
router.put('/:id', validateBody, (req, res) => SubjectController.update(req, res));
router.delete('/:id', validateQuery, (req, res) => SubjectController.remove(req, res));
router.delete("/:id/translations/:language_code", validateQuery, (req, res) =>SubjectController.removeTranslation(req, res));

export default router;
