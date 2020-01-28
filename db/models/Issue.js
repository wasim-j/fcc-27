const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  issue_title: { type:String, required: [true, 'missing input: issue_title']},
  issue_text: { type:String, required: [true, 'missing input: issue_text']}, 
  created_by: { type:String, required: [true, 'missing input: created_by']},
  assigned_to: { type:String, default:""},
  status_text: { type:String, default:""},
  created_on: { type:Date, default: Date.now()},
  updated_on: { type:Date, default: Date.now()}, 
  open: { type:Boolean, default: true}
});