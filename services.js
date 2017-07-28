angular.module('starter.services', [])
.factory("sqliteCollections", function ($cordovaSQLite) {
    var shortName = 'sifelv2';
    var version = '1.0';
    var displayName = 'Display Information';
    var maxSize = 30000000; // in bytes
    var db = window.openDatabase(shortName, version, displayName, maxSize);
    return {
        deleteCollection: function (colName) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql('drop table IF EXISTS '+colName, []);
                    //tx.executeSql('CREATE TABLE IF NOT EXISTS '+colName+' (key TEXT PRIMARY KEY, val TEXT)');
                }, function(error) {
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        deleteCollections: function (cols) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql('drop table IF EXISTS '+colName, []);
                    //tx.executeSql('CREATE TABLE IF NOT EXISTS '+colName+' (key TEXT PRIMARY KEY, val TEXT)');
                }, function(error) {
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        clearCollection: function (colName) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql('delete from '+colName, []);
                }, function(error) {
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        removeNus: function (colName) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql("delete from "+colName + " where [key] like + 'nu_%'", []);
                }, function(error) {
                    console.log(error);
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        clearCollections: function (cols) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql('delete from '+colName, []);
                }, function(error) {
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        createCollection: function (colName) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS '+colName+' (key TEXT PRIMARY KEY, val TEXT)');
                }, function(error) {
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        createCollections: function (cols) {
            return new Promise(function (resolve, reject) {
                db.transaction(function(tx) {
                    for (var i = 0;i < cols.length;i++)
                    {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS '+cols[i].name+' (key TEXT PRIMARY KEY, val TEXT)');
                    }
                }, function(error) {
                    console.log(error);
                    reject("err");
                }, function() {
                    resolve("ok");
                });
            });
        },
        addInCollection: function (colName, key, val) {
            db.transaction(function(tx) {
                tx.executeSql('DELETE FROM '+colName+' where key = ?;', [key]);
                tx.executeSql('INSERT INTO '+colName+' VALUES (?,?)', [key, JSON.stringify(val)]);
            }, function(error) {
                console.error(error);
            }, function() {
            });
        },
        getInCollection: function (colName, key) {
            return new Promise(function (resolve, reject) {
                var query = 'select val from '+colName+' where key=?';
                $cordovaSQLite.execute(db, query, [key]).then(function(res) {
                    if (res.rows.length > 0)
                    {
                        resolve(JSON.parse(res.rows.item(0).val));
                    }
                    else { resolve(""); }
                }, function (err) {
                    reject("err");
                });
            });
        },
        getCollectionCount: function (colName) {
            return new Promise(function (resolve, reject) {
                var query = 'select count(*) as mcount from '+colName;
                $cordovaSQLite.execute(db, query, []).then(function(res) {
                    resolve(res.rows.item(0).mcount);
                }, function (err) {
                    console.log("getCollectionCount",err);
                    reject("err");
                });
            });
        },
        getCollection: function (colName) {
            return new Promise(function (resolve, reject) {
                var query = 'select * from '+colName;
                $cordovaSQLite.execute(db, query, []).then(function(res) {
                    var ret = [];
                    if (res.rows.length > 0)
                    {
                        for (var i = 0;i < res.rows.length;i++)
                        {
                            ret.push(JSON.parse(res.rows.item(i).val));
                        }
                        resolve(ret);
                    }
                    else { resolve(ret); }
                }, function (err) {
                    reject("err");
                });
            });
        },
    }
});
