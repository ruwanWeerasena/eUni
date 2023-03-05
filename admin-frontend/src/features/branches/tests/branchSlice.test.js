import reducer, { createBranch } from "../branchSlice";


test.skip("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    branchList: [],
    status: "idle",
    operation: "",
    error: null,
  });
});

