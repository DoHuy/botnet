// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as FilterByDate from '../../domains/MonitorServices/FilterByDate';
// @ts-ignore
let cordinator = new Monitor(new FilterByDate());

let SearchingCon: any = {};

SearchingCon.searchByDate = async (req, res)=>{
    try{
        let rs: any = await cordinator.executeFilteringService(req.jsonData);
        return res.status(200).send({flag: true, result: rs});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}


module.exports = SearchingCon;