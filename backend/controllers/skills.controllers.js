const { validationResult } = require('express-validator');
const skillsService = require('../services/skills.services');

module.exports.addSkill = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Skill is required" });
  }

  const { skill, des } = req.body;
  const userId = req.user;

  try {
    const skills = await skillsService.addSkill(skill, userId, des);
    return res.status(201).json({ skills });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getSkills = async (req, res) => {
  try {
    const user = req.user;
    const skills = await skillsService.getSkills(user);

    if (!skills)
      return res.status(400).json({ message: "no skill found" });

    return res.status(201).json({ skills });
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports.getSkillsToLearn = async (req, res) => {
  try {
    const user = req.user;
    const skills = await skillsService.getSkillsToLearn(user);

    if (!skills)
      return res.status(400).json({ message: "no skill found" });

    return res.status(201).json({ skills });
  } catch (err) {
    return res.status(500).json({ err });
  }
}

module.exports.deleteSkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json({ error: errors.array() });

  const { skillId } = req.body;

  try {
    const delSkill = await skillsService.deleteSkill(skillId);
    return res.status(201).json({ messsage: "Deleted successfully" })
  } catch(err){
    return res.status(500).json({err})
  }
}

module.exports.addSkillsToLearn = async (req, res ) =>{
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Skill is required" });
  }

  const { skill, des } = req.body;
  const userId = req.user;

  try {
    const skills = await skillsService.addSkillsToLearn(skill, userId, des);
    return res.status(201).json({ skills });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}