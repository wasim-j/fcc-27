const Project = require('./models/Project');

module.exports = (name, issue) => {
  // @ name (string) 
  // returns a promise
  
  const project = new Project({
    project_name: name,
    issues: [issue]
  })
  
  let error = project.validateSync();
  
  return (error) ? null : project.save();// project.save() returns a promise which if successful will return the project
}