// @ts-ignore
let Controller: any={};

Controller.AuthController = require('./AuthController');
Controller.SettingCon = require('./SettingCon');
Controller.UpDownCheckingCon = require('./UpDownCheckingCon');
Controller.SearchingCon = require('./SearchingCon');
Controller.HackedDNSDetectingCon = require('./HackedDNSDetectingCon');
module.exports = Controller;