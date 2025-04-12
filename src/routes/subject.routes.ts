import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';

const router = Router();

router.get('/', (req, res) => SubjectController.getAllSubjects(req, res));
router.get('/:id', (req, res) => SubjectController.getById(req, res));
router.post('/', (req, res) => SubjectController.create(req, res));
router.put('/:id', (req, res) => SubjectController.update(req, res));
router.delete('/:id', (req, res) => SubjectController.remove(req, res));

export default router;