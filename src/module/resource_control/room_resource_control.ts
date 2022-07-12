export function GenerateRoomResourceControl(room: string): RoomResourceControlModule | undefined {
  const condition = initSourceCondition(room);
  if (!condition) {
    return undefined;
  }
  return {
    room,
    sourceCondition: condition
  };
}

function initSourceCondition(room: string): SourceCondition[] | undefined {
  if (!Game.rooms[room]) {
    return undefined;
  }
  const sources = Game.rooms[room].find(FIND_SOURCES);
  const conditions: SourceCondition[] = [];
  for (const source of sources) {
    conditions.push({
      source,
      minorNumber: 0,
      priority: 5
    });
  }
  return conditions;
}
