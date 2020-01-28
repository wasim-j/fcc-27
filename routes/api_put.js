const get_project = require("../db/project_get");
const modify_issue = require("../db/issue_put");

module.exports = async (req, res) => {
  const project_name = req.params.project;

  if(!req.body._id) return res.send('no id sent');
  let project = await get_project(req.params.project); // get project  
  
  (project) ? res.send( await modify_issue(req.body, project)) : res.send('project not found');
}
/*
I can PUT /api/issues/{projectname} with a id and any fields in the object with a value to object said object. 
Returned will be 'successfully updated' or 'could not update '+id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
*/