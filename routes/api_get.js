const get_project = require("../db/project_get");

module.exports = async (req, res) => {
  //console.log(req.query);
  const project_name = req.params.project;
  let query = req.query;
  
  let project = await get_project(req.params.project); // get project
  if(!project) return res.send('project does not exist')
    
  let all_query_keys = Object.keys(query);
  if(all_query_keys.length === 0) return res.json(project.issues);
  
  // valid keys only
  let valid_field_names = ["issue_title", "issue_text", "created_by", "assigned_to", "status_text", "open"];
  let valid_query_keys =  [];
  all_query_keys.forEach( field => {
    let valid = valid_field_names.find(valid_field => valid_field === field)
    if(valid) valid_query_keys.push(valid);
    return;
  })
  
  // filtering
  let filtered = filter(project.issues, query, valid_query_keys);
  res.json(filtered);
}
/*
I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). 
I can pass along as many fields/values as I want.
*/

function filter(issues, query, query_keys) {
  if(issues.length === 0 || query_keys.length === 0) return issues; // break case
  
  // repeatedly (recursively) filter until no more fields to query
  
  issues = issues.filter(issue => issue[query_keys[0]].toString() === query[query_keys[0]] )
  
  query_keys.splice(0,1);
  
  return filter(issues, query, query_keys)
}