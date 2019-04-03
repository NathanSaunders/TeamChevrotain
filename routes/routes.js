const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/models.js');
var Document = models.Document;
var User = models.User;