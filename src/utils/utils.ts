export function CompareRoomPositionWithInRoomPosition(pos: RoomPosition, inPos: InRoomPosition): boolean {
  return pos.inRangeTo(inPos.x, inPos.y, inPos.range);
}

export const AllDirections: DirectionMap[] = [
  { dir: TOP, dx: 0, dy: -1 },
  { dir: TOP_RIGHT, dx: 1, dy: -1 },
  { dir: RIGHT, dx: 1, dy: 0 },
  { dir: BOTTOM_RIGHT, dx: 1, dy: 1 },
  { dir: BOTTOM, dx: 0, dy: 1 },
  { dir: BOTTOM_LEFT, dx: -1, dy: 1 },
  { dir: LEFT, dx: -1, dy: 0 },
  { dir: TOP_LEFT, dx: -1, dy: -1 }
];
