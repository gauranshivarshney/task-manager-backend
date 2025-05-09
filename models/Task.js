const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskTitle: { 
    type: String, required: true 
  },
  team: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Team'
  }],
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true 
  },
  stage: { 
    type: String, enum: ['To do', 'In Progress', 'Completed'], default: 'To do' 
  },
  dueDate: { 
    type: Date 
  },
  priority: { 
    type: String, enum: ['Normal', 'Medium', 'High'], default: 'Normal' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);