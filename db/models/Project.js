const mongoose = require('mongoose');
const schema_issue = require('./Issue')

const schema_project = new mongoose.Schema ({
  project_name : {type: String, required: true},
  issues: [schema_issue]
})

module.exports = mongoose.model(process.env.DB_COLLECTION, schema_project);