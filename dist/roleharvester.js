module.exports = {
    run:function(creep,spawn){
        if(creep.memory.working == true && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
        {
            creep.memory.working = false;
        }
        else if(creep.memory.working == false && creep.store[RESOURCE_ENERGY] == 0)
        {
            creep.memory.working = true;
        }
        if(creep.memory.working == true)
        {
            var source=creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source)==ERR_NOT_IN_RANGE)
            {
                creep.moveTo(source);
            }
        }
        else
        {
            if(creep.transfer(spawn,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                creep.moveTo(spawn);
            }
        }
    }
};