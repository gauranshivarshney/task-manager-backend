const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members' });
  }
});

router.post('/', async (req, res) => {
  const { fullName, email, role, active } = req.body;
  const newMember = new Team({ fullName, email, role, active });
  try {
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error saving new team member:", error);
    res.status(500).json({ message: 'Error adding team member' });
  }
});

router.delete('/:email', async (req, res) => {
  try {
    await Team.deleteOne({ email: req.params.email });
    res.status(200).json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team member' });
  }
});

module.exports = router;