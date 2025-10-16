import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { SearchProvider } from "../context/SearchContext";
import Navbar from "./Navbar";

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>{component}</SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Navbar", () => {
  it("shows login and register buttons when not authenticated", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("login-button")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
    expect(screen.queryByTestId("orders-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("profile-button")).not.toBeInTheDocument();
  });

  it("shows orders and profile buttons when authenticated", () => {
    localStorage.setItem("isAuthenticated", "true");
    renderWithProviders(<Navbar />);

    expect(screen.getByTestId("orders-button")).toBeInTheDocument();
    expect(screen.getByTestId("profile-button")).toBeInTheDocument();
    expect(screen.queryByTestId("login-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("register-button")).not.toBeInTheDocument();
  });

  it("handles logout correctly", () => {
    localStorage.setItem("isAuthenticated", "true");
    renderWithProviders(<Navbar />);

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("isAuthenticated")).toBe("false");
  });
});
