var roleupgrader=require('./roleupgrader');
module.exports = {
    run:function(creep){
        var structure=creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
            filter:(s) => s.store!=undefined && s.store.getUsedCapacity(RESOURCE_ENERGY)<s.store.getCapacity(RESOURCE_ENERGY)
        });
        if(structure!=undefined){
            if(creep.transfer(structure,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                creep.moveTo(structure);
            }
        }
        else{
            roleupgrader.run(creep);
        }
    },
    prepare:function(creep){
        var source=creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(source)==ERR_NOT_IN_RANGE)
        {
            creep.moveTo(source);
        }
    }
};