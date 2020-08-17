var watcher = require('./watch-client');
var spawn = require('./spawn');
var tower = require('./tower');
var rolehandler = require('./rolehandler');
module.exports.loop = function () {
    for (const spawn_name in Game.spawns) {
        spawn.run(Game.spawns[spawn_name]);
    }
    for (const room_pos of Game.rooms) {
        var towers = room_pos.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
        });
        for (let m_tower of towers) {
            tower.defense(m_tower);
        }
    }
    for (const creep_name in Memory.creeps) {
        if (Game.creeps[creep_name] == undefined) {
            delete Memory.creeps[creep_name];
            continue;
        }
        var creep = Game.creeps[creep_name];
        rolehandler.run(creep);
    }
    watcher();
};
