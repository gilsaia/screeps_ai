var rolebuilder=require('./rolebuilder');
module.exports = {
    run:function(creep){
        var structure=creep.pos.findClosestByPath(FIND_MY_STRUCTURES,{
            filter:(s)=>s.hits<s.hitsMax && s.structureType != STRUCTURE_WALL
        });
        if(structure==undefined){
            structure=creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter:(s)=>s.hits<s.hitsMax && s.structureType == STRUCTURE_ROAD
            });
        }
        if(structure!=undefined){
            if(creep.repair(structure)==ERR_NOT_IN_RANGE){
                creep.moveTo(structure);
            }
        }
        else{
            structure=creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter:(s)=> s.structureType == STRUCTURE_WALL && s.hits<s.hitsMax});
            if(structure!=undefined){
                if(creep.repair(structure)==ERR_NOT_IN_RANGE){
                    creep.moveTo(structure);
                }
            }
            else{
                rolebuilder.run(creep);
            }
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
