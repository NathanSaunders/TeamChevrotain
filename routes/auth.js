var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var models = require('../models/models');
var User = mongoose.model('User')
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
