import { classNames } from "./classNames";

describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames(classNames("someClass"))).toBe(classNames("someClass"));
  });

  test("with additional class", () => {
    const expected = "someClass class1 class2";
    expect(classNames(classNames("someClass", {}, ["class1", "class2"]))).toBe(
      expected
    );
  });

  test("with mods", () => {
    const expected = "someClass class1 class2 howered scrollable";
    expect(
      classNames(
        classNames("someClass", { howered: true, scrollable: true }, [
          "class1",
          "class2",
        ])
      )
    ).toBe(expected);
  });

  test("with mods false", () => {
    const expected = "someClass class1 class2 howered";
    expect(
      classNames(
        classNames("someClass", { howered: true, scrollable: false }, [
          "class1",
          "class2",
        ])
      )
    ).toBe(expected);
  });

  test("with mods undefined", () => {
    const expected = "someClass class1 class2 howered";
    expect(
      classNames(
        classNames("someClass", { howered: true, scrollable: undefined }, [
          "class1",
          "class2",
        ])
      )
    ).toBe(expected);
  });
});
