module.exports = (project, issue) => {
  // @project should be an instance of the model class Project
  // @issue an object that has been prevalidated to ensure that it is in line with the schema of the Issue class
  // returns a promise
  
  project.issues = project.issues.concat([issue]); // or you could: https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
  
  let error = project.validateSync(); // prevalidate
 
  return (error) ? null : project.save()
}