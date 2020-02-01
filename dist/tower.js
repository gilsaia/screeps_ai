module.exports = {
    defense: function (tower) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return object.getActiveBodyparts(ATTACK) == 0;
            }
        });
        if (target != undefined) {
            tower.attack(target);
        }
    }
};
