import { useContext } from "react";
import CustomerContext from "./CustomerContextValue";

export function useCustomers() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomers must be used inside a CustomerProvider");
  }

  return context;
}
