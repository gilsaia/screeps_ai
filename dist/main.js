var watcher=require('./watch-client');
var produce=require('./spawn');
var rolehandler=require('./rolehandler');
module.exports.loop = function(){
    for(const spawn_name in Game.spawns){
        produce.run(Game.spawns[spawn_name]);
    }
    for(const creep_name in Memory.creeps){
        if(Game.creeps[creep_name] == undefined){
            delete Memory.creeps[creep_name];
            continue;
        }
        var creep=Game.creeps[creep_name];
        rolehandler.run(creep);
    }
    watcher();
};