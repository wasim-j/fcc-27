const get_project = require("../db/project_get");
const del_issue = require("../db/issue_del");

module.exports = async (req, res) => {
  const project_name = req.params.project;

  if(!req.body._id) return res.send('id error');
  let project = await get_project(req.params.project); // get project
  
  (project) ? res.json( await del_issue(req.body._id, project)) : res.send('project not found');
}
/*
I can DELETE /api/issues/{projectname} with a id to completely delete an issue. 
If no _id is sent return 'id error', success: 'deleted '+id, failed: 'could not delete '+id.
*/