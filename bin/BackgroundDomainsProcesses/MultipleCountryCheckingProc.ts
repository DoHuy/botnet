//[usa, uk, rusia, singapore, india , southkorea, japan, germany, france, Sweden]
// @ts-ignore
import *as ProxyDAO from '../../dao/ProxyDAO';
import * as Lib from "../../commons/Libs";
import * as CONSTANT from "../../commons/Constants";
import {NOTICE_RULE} from "../../commons/Configs";
import * as CONFIG from "../../commons/Configs";
// @ts-ignore
import*as SubProcManager from './SubProcManager';
let proxyDAO = new ProxyDAO();
let MultipleCountryCheckingProc: any = {};
let arrTest = JSON.stringify([{key: 'usa', value: 'United States'}, {key: 'japan', value: 'Japan'}, {key: 'uk', value: 'United Kingdom'}, {key: 'russia', value: 'Russia'}]);
MultipleCountryCheckingProc.connectionTimeout = process.argv[2] || 30000;
MultipleCountryCheckingProc.url = process.argv[3] || "https://youtube.com";
MultipleCountryCheckingProc.countriesList = process.argv[4] || arrTest;
/**
 *input: countriesList = [{key:, value:}, [{}]];
 * @retun process.exit()
 */
MultipleCountryCheckingProc.run = async (countriesList: any)=>{
    let country1=[], country2=[], country3=[], country4=[];
    let countries = [];
    countriesList = JSON.parse(countriesList);
    countriesList = JSON.parse(countriesList);

    for(let i=0 ; i<countriesList.length ; i++){
        let e = countriesList[i];
        countries.push(e.key);
    }

    let sql = `details->>'country' like '%United States%' OR details->>'country' like '%${countriesList[0].value}%'
            OR details->>'country' like '%${countriesList[1].value}%' OR details->>'country' like '%${countriesList[2].value}%'
            OR details->>'country' like '%${countriesList[3].value}%' AND status = 'active'`;

    try{
        let proxies = await proxyDAO.findByCondition(sql);
        proxies.forEach((e)=>{
            switch (e.details.country) {
                case countriesList[0].value:
                    country1.push(e);
                    break;
                case countriesList[1].value:
                    country2.push(e);
                    break;
                case countriesList[2].value:
                    country3.push(e);
                    break;
                case countriesList[3].value:
                    country4.push(e);
                    break;
            }
        });

    }catch (e) {
        throw e;
    }

    // init sub_process check up_down country
    // @ts-ignore
    let country1Proc: any = SubProcManager.initCalculateCountryProc(country1, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    // @ts-ignore
    let country2Proc: any = SubProcManager.initCalculateCountryProc(country2, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    // @ts-ignore
    let country3Proc: any = SubProcManager.initCalculateCountryProc(country3, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);
    // @ts-ignore
    let country4Proc: any = SubProcManager.initCalculateCountryProc(country4, MultipleCountryCheckingProc.connectionTimeout, MultipleCountryCheckingProc.url);

    let country1Data = new Promise((resolve) =>{
        country1Proc.on('message', (msg)=>{
           resolve(msg);
       });
    });
    let country2Data = new Promise((resolve)=>{
        country2Proc.on('message', (msg)=>{
           resolve(msg);
       }) ;
    });
    let country3Data = new Promise((resolve)=>{
        country3Proc.on('message', (msg)=>{
            resolve(msg);
        }) ;
    });
    let country4Data = new Promise((resolve) =>{
        country4Proc.on('message', (msg)=>{
            resolve(msg);
        });
    });

    Promise.all([country1Data, country2Data, country3Data, country4Data]).then(vals=>{
       process.send({countries: countries, result: vals});
       process.exit(0);
        // console.log({countries: countries, result: vals});
    });

};

// run done
MultipleCountryCheckingProc.run(MultipleCountryCheckingProc.countriesList);