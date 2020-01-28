// suite: functional tests
	
	// before tests: make sure that test project doesn't exist
	
	// suite: post tests
		// test: 'Every field filled in'
		// test: 'Required fields filled in'
		// test: 'Missing required fields'
	
	// suite: put tests
		// test: 'No body'
		// test: 'One field to update'
		// test: 'Multiple fields to update'
	
	// suite: get tests 
		// test: 'No filter'
		// test: 'One filter'
		// test: 'Multiple filters (test for multiple fields you know will be in the db for a return)'
	
	// suite: delete tests
		// test: 'No _id'
		// test: 'Valid id'
		
	// after tests: make sure that test project doesn't exist
	
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');


const server = require('../server');
const project_delete = require('../db/project_del')

chai.use(chaiHttp);

let project_name = 'test';
let route = `/api/issues/${project_name}`;
let issue_1 = null;
let issue_2 = null;

suite('Functional Tests', () => {
	
	before( async () => {
		await project_delete(project_name);
	});
	
	suite( 'POST /api/issues/{project} => object with issue data', () => {
		
    test('Every field filled in', done => {
       chai.request(server)
        .post(route)
        .send({
          issue_title: 'Issue 1',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');
          assert.equal(res.body.issue_title, 'Issue 1');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');
          assert.isBoolean(res.body.open);
          assert.equal(res.body.open, true);
          issue_1 = res.body;
          done();
        });
      });
      
      test('Required fields filled in', done => {
       chai.request(server)
        .post(route)
        .send({
          issue_title: 'Issue 2',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in'
        })
        .end( (err, res) =>{
          assert.equal(res.status, 200);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id');
          assert.equal(res.body.issue_title, 'Issue 2');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Required fields filled in');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.isBoolean(res.body.open);
          assert.equal(res.body.open, true);
          issue_2 = res.body;
          done();
        });        
      });
      
      test('Missing required fields', done => {
       chai.request(server)
        .post(route)
        .send({
          issue_title: 'Title 3',
          created_by: 'Functional Test - Missing required fields',
          assigned_to: 'Chai and Mocha'
        })
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing inputs');
          done();
        });        
      });
    
	});
	
	suite( 'PUT /api/issues/{project} => text', () => {
		test('No body', done => {
      chai.request(server)
        .put(route)
        .send({_id: issue_1._id})
        .end( (err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no updated field sent');
          done();
        })
    })
    
    test('One field to update', done => {
        chai.request(server)
        .put(route)
        .send({_id: issue_1._id, issue_text: 'updated issue text test'})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'successfully updated');
          done();
        });  
      });
      
      test('Multiple fields to update', done => {
        chai.request(server)
        .put(route)
        .send({_id: issue_2._id, issue_text: 'updated issue text test for the second issue', open: 'false'})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'successfully updated');
          done();
        });  
      });
    
    
    
    
	});
	
	suite( 'GET /api/issues/{project} => Array of objects with issue data', () => {
		
    test('No filter', done => {
        chai.request(server)
        .get(route)
        .query({})
        .end( (err, res) => {
          //console.log(res.body)
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', done => {
        chai.request(server)
        .get(route)
        .query({assigned_to: 'Chai and Mocha'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          assert.equal(res.body[0].assigned_to, 'Chai and Mocha');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', done => {
        chai.request(server)
        .get(route)
        .query({open: false})
        .end((err, res) =>{
          //console.log(res.body)
          assert.equal(res.status, 200);
          
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          assert.equal(res.body[0].open, false);
          assert.equal(res.body[0].issue_title, 'Issue 2');
          
          done();
        });
      });
    
    
	});
	
	suite( 'DELETE /api/issues/{project} => text', () => {
		
    test('No _id', done => {
        chai.request(server)
        .delete(route)
        .send({})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'id error');
          done();
        });  
      });
      
      test('Valid _id', done => {
        chai.request(server)
        .delete(route)
        .send({_id: issue_1._id})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.body.success, 'deleted '+issue_1._id);
          done();
        });  
      });
    
	});
	
	after( async () => {
		await project_delete(project_name);
	});
	
});