const C = require('../model/cModel');
const CPP = require('../model/cppModel');
const CSHARP = require('../model/csharpModel');
const HTML = require('../model/htmlModel');
const CSS = require('../model/cssModel');
const JAVASCRIPT = require('../model/javascriptModel');
const PYTHON = require('../model/pythonModel');
const NODE = require('../model/nodeModel');
const MYSQL = require('../model/mysqlModel');
const MONGO = require('../model/mongoModel');
const LINUX = require('../model/linuxModel');
const ANDROID = require('../model/androidModel');



const returnModel = (subject) => {
    switch (subject) {
        case "c":
            return C;
        case "cpp":
            return CPP;
        case "csharp":
            return CSHARP;
        case "html":
            return HTML;
        case "css":
            return CSS;
        case "javascript":
            return JAVASCRIPT;
        case "python":
            return PYTHON;
        case "node-express":
            return NODE;
        case "mongo-mongoose":
            return MONGO;
        case "mysql":
            return MYSQL;
        case "linux":
            return LINUX;
        case "android":
            return ANDROID;
    }
}

module.exports = returnModel;