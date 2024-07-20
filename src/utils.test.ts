import { describe, test, expect } from "vitest";
import { getNextGen } from "./utils";

describe("getNextGen", () => {
  test("should throw error when called with no cells", () => {
    expect(() => getNextGen([[]])).toThrowError();
  });

  test("should return single dead cell when called with single dead cell", () => {
    expect(getNextGen([[false]])).toEqual([[false]]);
  });

  test("should return a single dead cell when called with single alive cell", () => {
    expect(getNextGen([[true]])).toEqual([[false]]);
  });
  test("should stay alive when cell is alive and has 3 neighbours", () => {
    const board = [
      [true, true],
      [true, true],
    ];
    const result = getNextGen(board);
    expect(result).toEqual([
      [true, true],
      [true, true],
    ]);
  });
  test("should stay alive when cell is alive and has 3 neighbours", () => {
    const board = [
      [true, true],
      [true, true],
    ];
    const result = getNextGen(board);
    expect(result).toEqual([
      [true, true],
      [true, true],
    ]);
  });
});
