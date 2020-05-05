import { demo } from "../src";

describe("demo", () => {

  it("returns hello world", () => {
    const res = demo();
    expect(res).toEqual("hello world");
  });
});
