var roleupgrader = require('./roleupgrader');
module.exports = {
    run:function(creep){
        var structure = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        if(structure!=undefined){
            if(creep.build(structure)==ERR_NOT_IN_RANGE){
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
