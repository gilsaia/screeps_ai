module.exports = {
    run:function(creep){
        if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
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