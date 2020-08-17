const dividecreeptype = [200, 300, 500, 800, 1000, 2000, 3000, 5000, 10000, 20000];
const creepType = {
    "harvester": [[WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]],
    "upgrader": [[WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]],
    "builder": [[WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]],
    "repairer": [[WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]]
};
module.exports = function(){
    StructureSpawn.prototype.spawncustomCreep=
    function(energy,rolename){
        if(energy<200){
            return ERR_NOT_ENOUGH_ENERGY;
        }
        var type=0;
        while(energy>=dividecreeptype[type+1]){
            ++type;
        }
        return this.spawnCreep(creepType[rolename][type],rolename+Math.round(Math.random()*10000).toString(),{
            memory:{role:rolename,working:true}
        });
    };
};
