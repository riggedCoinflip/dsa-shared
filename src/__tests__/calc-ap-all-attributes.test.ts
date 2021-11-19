import { calcApAll, rename } from "../calc-ap/calc-ap-helper";

describe('calcApHelper', () => {
  describe("rename", () => {
    it("renames correctly", () => {
      expect(rename("name")).toBe("apName")
    })
  })

});