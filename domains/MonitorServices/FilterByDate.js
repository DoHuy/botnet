"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const FilteringServiceInterface = require("./FilteringServiceInterface");
const MonitoredWebssiteDAO = require("../../dao/MonitoredWebsiteDAO");
const ResponseStateDAO = require("../../dao/ResponseStateDAO");
const monitoredWebsiteDAO = new MonitoredWebssiteDAO();
const responseStateDAO = new ResponseStateDAO();
function FilterByDate() {
    FilteringServiceInterface.call(this);
}
util.inherits(FilterByDate, FilteringServiceInterface);
FilterByDate.prototype.doFiltering = (jsonData) => __awaiter(this, void 0, void 0, function* () {
    let rs = { siteName: "", url: "", images: [] };
    try {
        let site = yield monitoredWebsiteDAO.findById(jsonData.webId);
        let respState = yield responseStateDAO.findByCondition(`webid=${jsonData.webId} AND created between '${jsonData.start}' and '${jsonData.end}'`);
        respState.forEach(e => {
            let obj = {
                created: e.created,
                img: e.notification.notification.img
            };
            rs.images.push(obj);
        });
        rs.siteName = site.siteName;
        rs.url = site.url;
    }
    catch (e) {
        throw e;
    }
    return rs;
});
module.exports = FilterByDate;
//# sourceMappingURL=FilterByDate.js.map