const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  fullName: { 
    type: String, required: true 
  },
  email: { 
    type: String, required: true, unique: true 
  },
  role: { 
    type: String, required: true 
  }
});

module.exports = mongoose.model('Team', teamMemberSchema);