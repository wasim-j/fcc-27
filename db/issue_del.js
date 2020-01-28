module.exports = async (issue_id, project) => {  
  
  project.issues.id(issue_id).remove(); // https://mongoosejs.com/docs/subdocs.html#removing-subdocs
  
  return project.save()
    .then(()=> {return {success: `deleted ${issue_id}`}})
    .catch(err => {return {failed:`could not delete ${issue_id}`}})
}