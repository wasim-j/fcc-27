const Project = require('./models/Project');

module.exports = project_name => {
  return Project.deleteOne({project_name}, (err, record) => (err) ? false : record);
}