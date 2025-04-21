const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const skillsController = require('../controllers/skills.controllers')

router.post('/add-skills',
    body('skill').isLength({min : 2}).withMessage("Skill required"),
    body('des').isLength({min : 5}).withMessage("Description is required"),
    authMiddleware.authUser,
    skillsController.addSkill
)

router.get('/get-skills',
    authMiddleware.authUser,
    skillsController.getSkills
)

router.get('/get-skillsToLearn',
    authMiddleware.authUser,
    skillsController.getSkillsToLearn
)

router.post('/delete-skill',
    body('skillId').isLength({min : 5}).withMessage("Id is required"),
    authMiddleware.authUser,
    skillsController.deleteSkill
)

router.post('/skills-to-learn',
    body('skill').isLength({min : 2}).withMessage("Skill required"),
    body('des').isLength({min : 5}).withMessage("Description is required"),
    authMiddleware.authUser,
    skillsController.addSkillsToLearn
)

module.exports = router