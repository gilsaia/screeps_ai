var roleharvester=require('./roleharvester');
var roleupgrader=require('./roleupgrader');
var rolebuilder=require('./rolebuilder');
var rolerepairer=require('./rolerepairer');
module.exports ={
    run:function(creep){
        if(creep.memory.working == true && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
            creep.memory.working = false;
        }
        else if(creep.memory.working == false && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = true;
        }
        var isworking = creep.memory.working;
        if(creep.memory.role == 'harvester'){
            if(isworking){
                roleharvester.prepare(creep);
            }
            else{
                roleharvester.run(creep);
            }
        }
        else if (creep.memory.role == 'upgrader'){
            if(isworking){
                roleupgrader.prepare(creep);
            }
            else{
                roleupgrader.run(creep);
            }
        }
        else if (creep.memory.role == 'builder'){
            if(isworking){
                rolebuilder.prepare(creep);
            }
            else{
                rolebuilder.run(creep);
            }
        }
        else if (creep.memory.role == 'repairer'){
            if(isworking){
                rolerepairer.prepare(creep);
            }
            else{
                rolerepairer.run(creep);
            }
        }
    }
};