module.exports = (update, project) => {
  let issue = project.issues.id(update._id);
  
  if(!issue) return 'issue does not exist';
  
  if(Object.keys(update).length <= 1) return 'no updated field sent';
  /*
  for(let field in update){
    if(!update._id) {
      issue[field] = update[field];
    }
  }
  issue.updated_on = Date.now();
  */
  update.updated_on = Date.now();
  issue.set(update);
  
  //console.log(issue);
  return project.save()
    .then(()=> {return 'successfully updated'})
    .catch(err => {return `could not update ${update._id}`})
}