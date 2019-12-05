const minharvester=8;
module.exports = {
    run:function(spawn){
        if(spawn.store[RESOURCE_ENERGY] == spawn.store.getCapacity(RESOURCE_ENERGY)){
            var harvestnum=_.sum(Game.creeps,(c)=>c.memory.role =='harvester');
            if(harvestnum<minharvester){
                name='harvester'+Math.round(Math.random()*10000).toString();
                var flag=spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE],name,{
                    memory:{role:'harvester',working:true}
                });
            }
            else
            {
                name='upgrader'+Math.round(Math.random()*10000).toString();
                spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE],name,{
                    memory:{role:'upgrader',working:true}
                });
            }
        }
    }
};