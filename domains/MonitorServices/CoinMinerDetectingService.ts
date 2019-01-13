import * as DetectingServiceInterface from "./DetectingServiceInterface";
import * as util from "util";
import * as Lib from '../../commons/Libs';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import * as CONFIG from '../../commons/Configs';

function CoinMinerDetectingService() {
    // @ts-ignore
    DetectingServiceInterface.call(this);
}

//implement ServiceInterface
util.inherits(CoinMinerDetectingService, DetectingServiceInterface);

CoinMinerDetectingService.prototype.doDetection = (jsonData)=>{
   try{
        let fileData: any = path.join(__dirname, '..','..', 'data','store','filesDb', `coinminer_${jsonData.webId}.json`);
        return new Promise(((resolve, reject) => {
            fs.readFile(fileData, 'utf8', (err, data)=>{
               if(err) reject(err);
               resolve(data);
            });
        }));
   }catch (e) {
       throw e;
   }
};

module.exports = CoinMinerDetectingService;
