import React from "react";
import { Nav } from "@/app/admin/_components/Nav";
import { NavLink } from "@/app/admin/_components/NavLink";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { auth } from "@/auth";
import SignOutButton from "@/components/signout-button";
const NavBar = async () => {
  const session = await auth();

  return (
    <Nav>
      <Command className="border shadow-md rounded-none min-h-screen">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="min-h-screen">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem>
            <NavLink href="/admin" aria-label="Dashboard">
              {/* <LayoutDashboardIcon /> */}
              Dashboard
            </NavLink>
          </CommandItem>

          <CommandSeparator />
          <CommandGroup heading="Orders">
            <CommandItem>
              <NavLink href="/admin/sales/order" aria-label="Orders">
                {/* <ShoppingCartIcon /> */}
                Orders
              </NavLink>
            </CommandItem>
            <CommandItem>
              <NavLink href="/admin/sales/order/add" aria-label="Add Order">
                {/* <ShoppingCartIcon /> */}
                New Order
              </NavLink>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="sales">
            <CommandItem>
              <NavLink href="/admin/sales" aria-label="Sales">
                {/* <ShoppingBasketIcon /> */}
                Sales
              </NavLink>
            </CommandItem>
            <CommandItem>
              <NavLink href="/admin/sales/add" aria-label="Add Sales">
                {/* <ShoppingBasketIcon /> */}
                New Sales
              </NavLink>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Receipts">
            <CommandItem>
              <NavLink href="/admin/accounts/receipt" aria-label="Receipts">
                Receipts
              </NavLink>
            </CommandItem>
            <CommandItem>
              <NavLink
                href="/admin/accounts/receipt/add"
                aria-label="Add Receipt"
              >
                New Receipt
              </NavLink>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Products">
            <CommandItem>
              <NavLink href="/admin/product" aria-label="Products">
                {/* <FcAcceptDatabase size={32} /> */}
                Products
              </NavLink>
            </CommandItem>
            <CommandItem>
              <NavLink href="/admin/product/add" aria-label="Add Product">
                {/* <FcAcceptDatabase size={32} /> */}
                New Product
              </NavLink>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Users">
            <CommandItem>
              <NavLink href="/admin/users" aria-label="Users">
                {/* <PiUsersThree size={32} /> */}
                Users
              </NavLink>
            </CommandItem>
            <CommandItem>
              <NavLink href="/admin/users/add" aria-label="Add User">
                {/* <PiUsersThree size={32} /> */}
                New User
              </NavLink>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Masters">
            <CommandGroup heading="Pump Series">
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumpseries"
                  aria-label="Pump Series"
                >
                  {/* <ShoppingBasketIcon /> */}
                  Pump Series
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumpseries/add"
                  aria-label="Add Pump Series"
                >
                  {/* <ShoppingBasketIcon /> */}
                  New Pump Series
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Power">
              <CommandItem>
                <NavLink href="/admin/masters/powerhp" aria-label="Power In HP">
                  {/* <FaPowerOff size={18} /> */}
                  Power In HP
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/powerhp/add"
                  aria-label="Power In HP"
                >
                  {/* <FaPowerOff size={18} /> */}
                  New Power In HP
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink href="/admin/masters/powerkw" aria-label="Power In KW">
                  {/* <FaPowerOff size={18} /> */}
                  Power In KW
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/powerkw/add"
                  aria-label="Power In KW"
                >
                  {/* <FaPowerOff size={18} /> */}
                  New Power In KW
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pump Suction">
              <CommandItem>
                <NavLink
                  href="/admin/masters/suction"
                  aria-label="Pump Suction"
                >
                  {/* <SettingsIcon /> */}
                  Pump Suction
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/suction/add"
                  aria-label="Add Pump Suction"
                >
                  {/* <SettingsIcon /> */}
                  New Pump Suction
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pump Delivery">
              <CommandItem>
                <NavLink
                  href="/admin/masters/delivery"
                  aria-label="Pump Delivery"
                >
                  {/* <SettingsIcon /> */}
                  Pump Delivery
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/delivery/add"
                  aria-label="Add Pump Delivery"
                >
                  {/* <SettingsIcon /> */}
                  New Pump Delivery
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Voltage">
              <CommandItem>
                <NavLink
                  href="/admin/masters/voltage"
                  aria-label="Pump Rated Voltage"
                >
                  {/* <TbCircuitVoltmeter size={32} /> */}
                  Pump Rated Voltage
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/voltage/add"
                  aria-label="Add Pump Rated Voltage"
                >
                  {/* <TbCircuitVoltmeter size={32} /> */}
                  New Pump Rated Voltage
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Pump Type">
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumptypeapp"
                  aria-label="Pump Type (Application)"
                >
                  {/* <SettingsIcon /> */}
                  Pump Type (Application)
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumptypeapp/add"
                  aria-label="Add Pump Type (Application)"
                >
                  {/* <SettingsIcon /> */}
                  New Pump Type (Application)
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumptypeins"
                  aria-label="Pump Type (Installation)"
                >
                  {/* <SettingsIcon /> */}
                  Pump Type (Installation)
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink
                  href="/admin/masters/pumptypeins/add"
                  aria-label="Add Pump Type (Installation)"
                >
                  {/* <SettingsIcon /> */}
                  New Pump Type (Installation)
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Phase">
              <CommandItem>
                <NavLink href="/admin/masters/phase" aria-label="Phase">
                  {/* <SettingsIcon /> */}
                  Phase
                </NavLink>
              </CommandItem>
              <CommandItem>
                <NavLink href="/admin/masters/phase/add" aria-label="Add Phase">
                  {/* <SettingsIcon /> */}
                  New Phase
                </NavLink>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </CommandGroup>
        </CommandList>
      </Command>
    </Nav>
  );
};

export default NavBar;
