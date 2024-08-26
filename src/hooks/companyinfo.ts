import { create } from "zustand";

export const useCompanyInfo = create(() => ({
  companyInfo: {
    name: "Sri Navadurga Enterprises",
    address:
      "No. 0, Main Road, Panchayat Headquarter, Vettukadu, Villupuram, Tamil Nadu, India - 605501",
    phone: "080-2321 1234",
    email: "jpsborewellpumps@gmail.com",
    website: "www.jpsborewellpumps.com",
    gstin: "33JTJPK3621Q1Z5",
    pan: "AABFN1234C",
    district: "Villupuram",
    state: "Tamil Nadu",
    country: "India",
  },
}));
