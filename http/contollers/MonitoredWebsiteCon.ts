// import*as SettingService from '../../domains/MonitorServices/SettingService';
// // @ts-ignore
// const settingService: any = new SettingService();
// let MonitoredWebsiteCon: any = {};
//
// MonitoredWebsiteCon.register = async function (req, res){
//    try{
//        let web =  await settingService.createWebsite(req.web);
//        return res.status(200).send({flag: true, credentialId: req.web.credentialId, web:{id: web.id, siteName: web.siteName}});
//    }catch (e) {
//        return res.status(500).send({flag:false, message:"register fail"});
//    }
// }
//
// MonitoredWebsiteCon.settingAdvance = async function (req, res){
//     try{
//         let result = await settingService.addAdvanceConfigWebsite(req.config);
//         return
//     }catch (e) {
//         return res.status(500).send({flag:false, message:"setting fail"});
//     }
// }
// module.exports = MonitoredWebsiteCon;