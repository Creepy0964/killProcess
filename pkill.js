const { execSync } = require('child_process');

console.log('Script started.');
killProcess();

function killProcess() {
    let mem = execSync('cat /proc/meminfo | grep MemFree', {encoding: 'utf-8'});
    try {
        let firefox = execSync('ps -e | grep firefox', {encoding: 'utf-8'});
    }
    catch {
        console.log('No firefox running, exiting...');
    }
    let memFree = mem.replace(/\D/g,'');
    console.log(`free memory: ${memFree} kb`);
    console.log(`less than 500 mb: ${memFree < 500000}`);
    if(memFree > 500000) console.log('Mem is free. Exiting...');
    else {
        if(memFree < 500000 && firefox) {
            execSync('pkill firefox', {encoding: 'utf-8'});
            console.log('Successfully killed firefox. Exiting...');
        }
    }
}

setInterval(killProcess, 180000);
