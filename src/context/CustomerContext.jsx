import { useMemo, useState } from "react";
import CustomerContext from "./CustomerContextValue";
import { recentCustomers } from "../data/dashboardData";

const STORAGE_KEY = "clientflow_customers";

const seedCustomers = [
  ...recentCustomers,
  {
    id: "customer-006",
    name: "Priya Sharma",
    company: "Aster Labs",
    email: "priya@asterlabs.com",
    phone: "+91 98765 43210",
    status: "active",
    date: "Sep 12, 2026",
    notes: "Monthly product consultation.",
  },
  {
    id: "customer-007",
    name: "Daniel Thomas",
    company: "Northstar Media",
    email: "daniel@northstarmedia.com",
    phone: "+91 91234 56780",
    status: "pending",
    date: "Sep 11, 2026",
    notes: "Awaiting onboarding documents.",
  },
  {
    id: "customer-008",
    name: "Meera Raj",
    company: "PixelCraft Studio",
    email: "meera@pixelcraft.studio",
    phone: "+91 99887 66554",
    status: "active",
    date: "Sep 10, 2026",
    notes: "Website redesign project.",
  },
  {
    id: "customer-009",
    name: "Arun Kumar",
    company: "Orbit Systems",
    email: "arun@orbitsystems.in",
    phone: "+91 90000 11223",
    status: "inactive",
    date: "Sep 08, 2026",
    notes: "Paused account.",
  },
  {
    id: "customer-010",
    name: "Emily Wilson",
    company: "Greenline Co.",
    email: "emily@greenline.co",
    phone: "+91 95555 11222",
    status: "active",
    date: "Sep 07, 2026",
    notes: "Quarterly account review.",
  },
  {
    id: "customer-011",
    name: "Vikram Singh",
    company: "BluePeak Finance",
    email: "vikram@bluepeak.com",
    phone: "+91 98888 12345",
    status: "pending",
    date: "Sep 05, 2026",
    notes: "Proposal sent.",
  },
];

function getStoredCustomers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedCustomers;
  } catch {
    return seedCustomers;
  }
}

function persist(customers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(getStoredCustomers);

  const saveCustomers = (nextCustomers) => {
    setCustomers(nextCustomers);
    persist(nextCustomers);
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: `customer-${Date.now()}`,
      date: new Intl.DateTimeFormat("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    };

    saveCustomers([newCustomer, ...customers]);
    return newCustomer;
  };

  const updateCustomer = (id, updates) => {
    const next = customers.map((customer) =>
      customer.id === id ? { ...customer, ...updates } : customer,
    );
    saveCustomers(next);
  };

  const deleteCustomer = (id) => {
    saveCustomers(customers.filter((customer) => customer.id !== id));
  };

  const resetCustomers = () => {
    saveCustomers(seedCustomers);
  };

  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((item) => item.status === "active").length;
    const pending = customers.filter((item) => item.status === "pending").length;
    const inactive = customers.filter((item) => item.status === "inactive").length;

    return { total, active, pending, inactive };
  }, [customers]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        stats,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        resetCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
