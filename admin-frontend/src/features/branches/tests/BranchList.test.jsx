import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import BranchList from "../index";
import { BrowserRouter } from "react-router-dom";

const branchList = [
  {
    branchId: 1,
    name: "Weliveriya Branch Test",
    address: "43 Main Street Weliveriya",
    email: "weliveriya@euni.com",
    contactNumber: "0332255123",
    contactPerson: "Ajith Perera",
  },
  {
    branchId: 2,
    name: "Polonnaruwa Branch",
    address: "43 Parakrama Mawatha Polonnaruwa",
    email: "polonnaruwa@euni.com",
    contactNumber: "0452255123",
    contactPerson: "Tharindu Ilangakoon",
  },
];

export const handlers = [
  rest.get("http://localhost:5000/branch", (req, res, ctx) => {
    return res(ctx.json(branchList), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("fetches branch list", async () => {
  renderWithProviders(
    <BrowserRouter>
      <BranchList />
    </BrowserRouter>
  );

  // after some time, the user should be received
  expect(await screen.findByText(/Branches/i)).toBeInTheDocument();

  expect(await screen.findByText(/weliveriya branch test/i)).toBeInTheDocument();

});
