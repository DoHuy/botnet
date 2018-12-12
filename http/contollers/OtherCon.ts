import*as CONSTANT from '../../commons/Constants';
import*as Other from '../../domains/Other/Other';
// @ts-ignore
const other = new Other();
let OtherCon: any = {};

OtherCon.getCountries = async (req, res)=>{
    try{
        return res.status(200).send({flag: true, result: CONSTANT.COUNTRIES});
        //
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

OtherCon.getMonitoredWebsite = async (req, res)=>{
    try{
        let list = await other.getMonitoredWebsite(req.params.id);
        return res.status(200).send({flag: true, result: list});

    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

OtherCon.getAllParentMonitoredWebsite = async (req, res)=>{
    try{
        let list = await other.getAllParentMonitoredWebsite(req.credentialId);
        return res.status(200).send({flag: true, result: list});

    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

OtherCon.getDomainsOfWebsite = async (req, res)=>{
    try{
        let list = await other.getDomainsOfWebsite(req.params.id);
        return res.status(200).send({flag: true, result: list});

    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};

module.exports = OtherCon;