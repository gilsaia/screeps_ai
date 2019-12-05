var watcher=require('./watch-client');
var produce=require('./spawn');
var roleharvester=require('./roleharvester');
var roleupgrader=require('./roleupgrader');
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
        if(creep.memory.role == 'harvester'){
            roleharvester.run(creep,Game.spawns['001']);
        }
        else if (creep.memory.role == 'upgrader'){
            roleupgrader.run(creep,Game.spawns['001']);
        }
    }
    watcher();
};