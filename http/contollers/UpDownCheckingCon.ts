// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as NormalUpDownCheckingService from '../../domains/MonitorServices/NormalUpDownCheckingService';
import*as MultipleCountryUpDownCheckingService from '../../domains/MonitorServices/MultipleCountryUpDownCheckingService';
// @ts-ignore
let monitor = new Monitor(new NormalUpDownCheckingService());
// @ts-ignore
let monitorCountries = new Monitor(new MultipleCountryUpDownCheckingService());
let UpDownCheckingCon: any = {};

UpDownCheckingCon.getNormalUpDownInfo = async (req, res)=>{
   try{
       let rs: any = await monitor.executeStratergy(req.jsonData);
       return res.status(200).send({flag: true, result: rs});
   }catch (e) {
       return res.status(500).send({flag: false, message: e.message});
   }
}

UpDownCheckingCon.getCountriesInfo = async (req, res)=>{
    try{
        let rs: any = await monitorCountries.executeStratergy(req.jsonData);
        return res.status(200).send({flag:  true, result: rs});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}



module.exports = UpDownCheckingCon;