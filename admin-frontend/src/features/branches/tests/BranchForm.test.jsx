import { RouterProvider, createMemoryRouter } from "react-router-dom";
import * as React from "react";
import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import BranchForm from "../form";
import userEvent from "@testing-library/user-event";

describe("Create branch", () => {
  test.skip("create branch initial state should show Insert Label in the button", async () => {
    const routes = [
      {
        path: "/branches/:id",
        element: <BranchForm />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/branches/null"],
      initialIndex: 1,
    });

    renderWithProviders(<RouterProvider router={router} />);

    expect(await screen.findByText(/insert/i)).toBeInTheDocument();
  });

  test("insert branch and test the state", async () => {
    const handleSubmit = jest.fn();

    const routes = [
      {
        path: "/branches/:id",
        element: <BranchForm />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/branches/null"],
      initialIndex: 1,
    });

    renderWithProviders(<RouterProvider router={router} />);

    const branch = userEvent.setup();

    await branch.type(
      screen.getByRole("input", { name: /name/i }),
      "Kamal Perera"
    );
    await branch.type(
      screen.getByRole("input", { name: /address/i }),
      "89 Samagi Mawatha"
    );
    await branch.type(
      screen.getByRole("input", { name: /email/i }),
      "kamal@gmail.com"
    );
    await branch.type(
      screen.getByRole("input", { name: /contactNumber/i }),
      "123456789"
    );
    await branch.type(
      screen.getByRole("input", { name: /contactPerson/i }),
      "Ranjith"
    );

    await branch.click(screen.getByRole("button", { name: /insert/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "Kamal Perera",
        address: "89 Samagi Mawatha",
        email: "kamal@gmail.com",
        contactNumber: "123456789",
        contactPerson: "Ranjith",
      })
    );
  });
});
