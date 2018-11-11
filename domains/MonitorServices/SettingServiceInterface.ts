/**
 *
 * @param registerInfo la 1 obj json chua thong tin dang ki tu nguoi dung
 * @constructor
 */
function SettingServiceInterface(registerInfo=null) {
    this.registerInfo = registerInfo;
}

SettingServiceInterface.prototype.createWebsite = function (){};
SettingServiceInterface.prototype.addAdvanceConfigWebsite = function(){};
SettingServiceInterface.prototype.modifyConfigWebsite = function(){};
SettingServiceInterface.prototype.removeWebsite = function(){};
module.exports = SettingServiceInterface;