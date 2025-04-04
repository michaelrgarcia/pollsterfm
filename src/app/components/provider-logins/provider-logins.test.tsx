import userEvent from "@testing-library/user-event";

import providerLoginsConfig from "./config";

import { render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";

import ProviderLogins from "./provider-logins";

let turnstileBehavior: "success" | "failure" = "success";

vi.mock("../../../lib/actions", () => ({
  verifyTurnstile: vi.fn(
    (token) =>
      new Promise((resolve) =>
        setTimeout(() => {
          if (token === "valid-mock-token") {
            resolve({ success: true, status: 200 });
          } else if (
            turnstileBehavior === "failure" ||
            token === "invalid-mock-token"
          ) {
            resolve({ success: false, error: ["invalid-token"], status: 401 });
          }
        }, 100)
      )
  ),
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn((provider, options) => {
    Promise.resolve({
      error: null,
      status: 200,
      ok: true,
      url: options?.callbackUrl || providerLoginsConfig.callbackUrl,
    });
  }),
}));

interface MockTurnstileProps {
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
}

vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: MockTurnstileProps) => {
    const token =
      turnstileBehavior === "success"
        ? "valid-mock-token"
        : "invalid-mock-token";

    return <div data-testid="turnstile" onClick={() => onSuccess(token)} />;
  },
}));

describe("ProviderLogins", () => {
  it("calls signIn after successful Turnstile verification", async () => {
    const user = userEvent.setup();

    render(<ProviderLogins />);

    const turnstile = screen.getByTestId("turnstile");

    await user.click(turnstile);

    await waitFor(() => {
      expect(screen.getByText("Sign in with Spotify")).not.toBeDisabled();
    });

    const spotifySignIn = screen.getByText("Sign in with Spotify");

    await user.click(spotifySignIn);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("spotify", {
        callbackUrl: providerLoginsConfig.callbackUrl,
      });
    });
  });

  it("shows loading state during verification", async () => {
    const user = userEvent.setup();

    render(<ProviderLogins />);

    const turnstile = screen.getByTestId("turnstile");

    await user.click(turnstile);

    await waitFor(async () => {
      const spotifySignIn = screen.getByText("Sign in with Spotify");

      await user.click(spotifySignIn);

      expect(screen.getByText("Please wait...")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.queryByText("Please wait...")).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });
});

describe("ProviderLogins errors", () => {
  it("sign in without turnstile token fails", async () => {
    const user = userEvent.setup();

    render(<ProviderLogins />);

    const spotifySignIn = screen.getByRole("button", {
      name: "Sign in with Spotify",
    });
    expect(spotifySignIn).toBeDisabled();

    await user.click(spotifySignIn);

    expect(
      screen.queryByText("Please complete the verification.")
    ).not.toBeInTheDocument();
  });

  it("shows error when Turnstile verification fails", async () => {
    turnstileBehavior = "failure";

    const user = userEvent.setup();

    render(<ProviderLogins />);

    const turnstile = screen.getByTestId("turnstile");
    await user.click(turnstile);

    await waitFor(() => {
      const spotifySignIn = screen.getByRole("button", {
        name: "Sign in with Spotify",
      });

      expect(spotifySignIn).not.toBeDisabled();
    });

    const spotifySignIn = screen.getByRole("button", {
      name: "Sign in with Spotify",
    });
    await user.click(spotifySignIn);

    await waitFor(() => {
      expect(
        screen.getByText("Verification failed. Please try again.")
      ).toBeInTheDocument();
    });

    expect(screen.queryByText("Please wait...")).not.toBeInTheDocument();
  });
});
