// @ts-ignore
import*as Monitor from '../../domains/MonitorServices/Monitor';
import*as ComparisonDataExporting from '../../domains/MonitorServices/ComparisonDataExporting';
import*as fs from 'fs';
// @ts-ignore
let comparisonExporting = new Monitor(new ComparisonDataExporting());

let ExportingCon: any = {};

ExportingCon.exportComparisonData = async (req, res)=>{
    try{
        let rs: any = await comparisonExporting.executeExportingService(req.jsonData);
        // download
        res.setHeader('Content-disposition', `attachment;filename=${new Date().toISOString()}.csv`);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(rs);
        //
    }catch (e) {
        return res.status(500).send({flag: false, message: e.message});
    }
};



module.exports = ExportingCon;