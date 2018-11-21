const path = require('path');
export const LOCATION = {
    SINGLE_LOCATION:1,
    MULTIPLE_LOCATION:3
}

export const PATH = {
    FILE_DATA_PATH: path.normalize(`${__dirname}/../data/store/snapshot`)

}

export const WORDS = [['sky', 'ocean', 'humans', 'animals', 'drone', 'robot', 'autumn', 'education', 'environment', 'news', 'technology', 'gravity'],
                        ['beautiful', 'hot', 'clear', 'green', 'red', 'pain', 'happy', 'relax', 'peace', 'planet']
                    ];

export const LINKS =[
    'https://laravel.com/',
    'https://www.24h.com.vn/',
    'https://news.zing.vn/',
    'https://dantri.com.vn/',
    'https://vnexpress.net/',
    'https://mp3.zing.vn/',
    'https://www.youtube.com/',
    'https://www.google.com/',
    'https://www.google.com/intl/ru/gmail/about/#',
    `https://techmaster.vn/`,
    `https://khuyenmaithe.techcombank.com.vn/trang-chu`,
    `https://www.lazada.vn/`,
    `https://stackoverflow.com/`,
    `https://github.com/`
];

export const SERVICE_MAIL = ['VERIFY_MAIL'];

export const STATUS_CODE = [

    ["200", {"code": "OK", "message": "The request has succeeded"}],
    ["201", {"code": "CREATED", "message":"The request has been fulfilled and resulted in a new resource being created" }],
    ["202", {"code":"ACCEPTED", "message": "The request has been accepted for processing, but the processing has not been completed"}],
    ["203", {"code":"Non-Authoritative Information".toLocaleUpperCase(), "message": "The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy"}],
    ["204", {"code": "NO CONTENT", "message": "The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation"}],
    ["205", {"code": "RESET CONTENT", "message": "The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent"}],
    ["206", {"code": "PARTIAL CONTENT", "message": "The server has fulfilled the partial GET request for the resource"}],
    ["300", {"code": "MULTIPLE CHOICES", "message": "The requested resource corresponds to any one of a set of representations, each with its own specific location, and agent- driven negotiation information (section 12) is being provided so that the user (or user agent) can select a preferred representation and redirect its request to that location"}],
    ["301", {"code": "MOVED PERMANENTLY", "message":"The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs"}],
    ["302", {"code": "FOUND", "message": "The requested resource resides temporarily under a different URI"}],
    ["303", {"code": "SEE OTHER", "message": "The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource"}],
    ["304", {"code": "NOT MODIFIED", "message": "If the client has performed a conditional GET request and access is allowed, but the document has not been modified, the server SHOULD respond with this status code"}],
    ["305", {"code": "USE PROXY", "message":"The requested resource MUST be accessed through the proxy given by the Location field"}],
    ["306", {"code": "UNUSED", "message": "The 306 status code was used in a previous version of the specification, is no longer used, and the code is reserved"}],
    ["307", {"code": "Temporary Redirect".toLocaleUpperCase(), "message": "The requested resource resides temporarily under a different URI. Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests"}],
    ["400", {"code": "BAD REQUEST", "message": "The request could not be understood by the server due to malformed syntax"}],
    ["401", {"code": "UNAUTHORIZED", "message": "The request requires user authentication"}],
    ["402", {"code": "PAYMENT REQUIRED", "message":"This code is reserved for future use"}],
    ["403", {"code":"Forbidden".toLocaleUpperCase(), "message": "The server understood the request, but is refusing to fulfill it"}],
    ["404", {"code":"NOT FOUND", "messaage": "The server has not found anything matching the Request-URI" }],
    ["405", {"code": "METHOD NOT ALLOWED", "message": "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI"}],
    ["406", {"code": " Not Acceptable".toLocaleUpperCase(), "message": "The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request"}],
    ["500", {"code":"Internal Server Error".toLocaleUpperCase(), "message":"The server encountered an unexpected condition which prevented it from fulfilling the request"}],
    ["502", {"code": "BAD GATEWAY", "message":"The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request"}],
    ["504", {"code": "GATEWAY TIMEOUT", "message": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request"}]

];

export const COUNTRIES = [['usa', 'United States'], ['uk', 'United Kingdom'], ['russia', 'Russia'], ['singapore', 'Singapore'],
                        ['india', 'India'], ['korea', 'South Korea'], ['japan', 'Japan'], ['germany', 'Germany'], ['france', 'France'],
                        ['sweden', 'Sweden'], ['australia', 'Australia'], ['italy', 'Italy']];