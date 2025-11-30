const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  filename: { 
    type: String, 
    required: true 
  },
  originalFormat: { 
    type: String, 
    required: true 
  },
  convertedFormat: { 
    type: String, 
    required: true 
  },
  fileSize: { 
    type: Number, 
    required: true 
  },
  conversionDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  downloadUrl: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Document', DocumentSchema);