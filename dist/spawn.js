const mincrepplive=1;
const minharvester=2;
const minupgrader=2;
const minbuilder=3;
const minrepairer=2;
require('./prototypespawn')();
module.exports = {
    run:function(spawn){
        var harvestnum=_.sum(Game.creeps,(c)=>c.memory.role =='harvester');
        var energy=spawn.room.energyAvailable;
        if(energy == spawn.room.energyCapacityAvailable){
            var rolename='';
            if(harvestnum<minharvester){
                rolename='harvester';
            }
            else if(_.sum(Game.creeps,(c)=>c.memory.role =='upgrader')<minupgrader){
                rolename='upgrader';
            }
            else if(_.sum(Game.creeps,(c)=>c.memory.role =='builder')<minbuilder){
                rolename='builder';
            }
            else if(_.sum(Game.creeps,(c)=>c.memory.role =='repairer')<minrepairer){
                rolename='repairer';
            }
            if(rolename!=''){
                spawn.spawncustomCreep(energy,rolename);
            }
        }
        else if(harvestnum<mincrepplive){
            spawn.spawncustomCreep(spawn.room.energyCapacityAvailable,'harvester');
        }
    }
};