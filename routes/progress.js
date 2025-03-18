const express = require('express');
const router = express.Router();
const User = require('../model/user'); // Assuming you have a User model
const authenticate = require('../middleware/authenticate'); // Auth middleware

// Fetch user progress
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming the User model has progress, milestones, goals, and feedback
    const userProgress = {
      educationProgress: user.educationProgress,
      milestones: user.milestones,
      goals: user.goals,
      feedback: user.feedback
    };

    res.json(userProgress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
