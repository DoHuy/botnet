/**
 *
 * @param registerInfo la 1 obj json chua thong tin dang ki tu nguoi dung
 * @constructor
 */
function ServiceSettingManagerInterface(registerInfo=null) {
    this.registerInfo = registerInfo;
}

ServiceSettingManagerInterface.prototype.createWebsite = function (){};
ServiceSettingManagerInterface.prototype.addAdvanceConfigWebsite = function(){};
ServiceSettingManagerInterface.prototype.modifyConfigWebsite = function(){};
ServiceSettingManagerInterface.prototype.removeWebsite = function(){};
ServiceSettingManagerInterface.prototype.turnOnHackedDNSDetecting = function(){};
ServiceSettingManagerInterface.prototype.destroyHackedDNSDetecting = function(){};
ServiceSettingManagerInterface.prototype.turnOnDefacementDetecting = function(){};
ServiceSettingManagerInterface.prototype.destroyDefacementDetecting = function(){};
module.exports = ServiceSettingManagerInterface;