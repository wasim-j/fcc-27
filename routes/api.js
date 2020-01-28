"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

const api_get = require("./api_get");
const api_put = require("./api_put");
const api_post = require("./api_post");
const api_del = require("./api_del");

const routes_front_end = require("./front_end");

module.exports = app => {
  routes_front_end(app);

  // api route
  let api_route = "/api/issues/:project";
  app
    //.route(api_route)

    .get(api_route,(req, res) => {
      //console.log("get");
      api_get(req, res);
    })
    .post(api_route,(req, res) => {
      //console.log("post");
      api_post(req, res);
    })
    .put(api_route,(req, res) => {
      //console.log("put");
      api_put(req, res);
    })
    .delete(api_route,(req, res) => {
      //console.log("delete");
      api_del(req, res);
    });
};
