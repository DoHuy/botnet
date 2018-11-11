/**
 *id serial not null primary key,
 script text,
 created text,
 modified text,
 deleted text,
 webId int
 *
 * @constructor
 */
function PoisonScript(id=null, script=null, created=null, modified=null, deleted=null, webId=null) {
    this.id=id;
    this.script=script;
    this.created=created;
    this.modified =modified;
    this.deleted=deleted;
    this.webId = webId;
}

module.exports = PoisonScript;