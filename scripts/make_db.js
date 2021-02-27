const fs = require('fs');
const readline = require('readline');
const sqlite = require('sqlite3').verbose();
const textFilePath = '../earthquake-zip/unziped/data.txt';
const rs = fs.createReadStream(textFilePath);
const rl = readline.createInterface({
    input: rs,
});
const db = new sqlite.Database('../earthquake-zip/unziped/data.db');

function ParseReal(str) {
    return isNaN(parseFloat(str)) ? 0.0 : parseFloat(str);
}

function GetDegree(v1, v2, v3) {
    const t1 = ParseReal(v1);
    const t2 = ParseReal(v2);
    const t3 = ParseReal(v3);
    return t1 + (t2 / 60.0) + (t3 / 10000.0);
}

function GetDepth(v1, v2) {
    const t1 = ParseReal(v1);
    const t2 = ParseReal(v2);
    return t1 + (t2 / 100.0);
}

function GetMag(v1, v2) {
    const t1 = ParseReal(v1);
    const t2 = ParseReal(v2);
    return t1 + (t2 / 10.0);
}

function ZeroPadding(num, length){
    return ('       ' + num).slice(-length);
}

function RunDb(sql, params) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

fs.readFile(textFilePath, 'utf8', async (err, data) => {
    if(err) throw err;
    const dataArr = data.split('\n');
    nLines = dataArr.length;
    let iLine = 0;
    process.stdout.write("       /       ");

    await RunDb('create table if not exists earthquake_data (id INTEGER PRIMARY KEY, dt TEXT, lat REAL, lon REAL, depth REAL, mag REAL);', []);
    for(; iLine < nLines; iLine++) {
        const line = dataArr[iLine];

        // dt
        const year = line.substr(1, 4);
        const month = line.substr(5, 2);
        const day = line.substr(7, 2);
        const hour = line.substr(9, 2);
        const minute = line.substr(11, 2);
        const second = line.substr(13, 2);
    
        // lat
        const lat = GetDegree(line.substr(21, 3), line.substr(24, 2), line.substr(26, 2));
    
        // lon
        const lon = GetDegree(line.substr(32, 4), line.substr(36, 2), line.substr(38, 2));
    
        // depth
        const depth = GetDepth(line.substr(44, 3), line.substr(47, 2));
    
        // mag
        const mag = GetMag(line.substr(52, 1), line.substr(53, 1));
    
        await RunDb('insert into earthquake_data (dt, lat, lon, depth, mag) values (?, ?, ?, ?, ?);', [
            `${year}-${month}-${day} ${hour}:${minute}:${second}`,
            lat,
            lon,
            depth,
            mag
        ]);
        process.stdout.write("\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b");
        process.stdout.write(`${ZeroPadding(iLine, 7)}/${nLines}`);
        // if(iLine % 1000 === 999) {
        //     iLine++;
        //     break;
        // }
    }
    db.close();
});
