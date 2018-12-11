// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as FilterByDate from '../../domains/MonitorServices/FilterByDate';
import*as FilterComparisonDataByDate from '../../domains/MonitorServices/FilterComparisonDataByDate';
// @ts-ignore
let cordinator = new Monitor(new FilterByDate());
// @ts-ignore
let comparisonDataFiltering = new Monitor(new FilterComparisonDataByDate());

let SearchingCon: any = {};

SearchingCon.searchByDate = async (req, res)=>{
    try{
        let rs: any = await cordinator.executeFilteringService(req.jsonData);
        return res.status(200).send({flag: true, result: rs});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
}

SearchingCon.searchComparison = async (req, res)=>{
    try{
        let rs: any = await comparisonDataFiltering.executeFilteringService(req.jsonData);
        return res.status(200).send({flag: true, result: rs});
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};



module.exports = SearchingCon;