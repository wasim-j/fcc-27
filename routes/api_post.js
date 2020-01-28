const add_project = require("../db/project_add");
const get_project = require("../db/project_get");
const add_issue = require("../db/issue_add");

module.exports = async (req, res) => {
  let project = await get_project(req.params.project); // get project
  
  // if project exists  => add issue, else create new project => add issue
  project = (project) ? await add_issue(project, req.body) : await add_project(req.params.project, req.body);
  
  // if project saved => send last issue, else project didn't save because of missing inputs
  (project) ? res.json(project.issues[project.issues.length - 1]) : res.send('missing inputs');
}