module.exports = app => {
  
  //Sample front-end
  app.route('/:project/')
    .get( (req, res) => {
      res.sendFile(process.cwd() + '/views/issue.html');
    });

  //Index page (static HTML)
  app.route('/')
    .get((req, res) => {
      res.sendFile(process.cwd() + '/views/index.html');
    });
  
}