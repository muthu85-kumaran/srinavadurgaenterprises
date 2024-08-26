"use client";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@/components/ui/button";
import {
  getFormattedDate,
  getFormattedCurrency,
  decrypt,
  encrypt,
} from "@/lib/utils";
import { price_in_words } from "@/lib/currencytoword";
import { GetSalesOrder } from "@/actions/sales/SalesOrderAction";
import { PrinterIcon } from "lucide-react";
import { useCompanyInfo } from "@/hooks/companyinfo";
import CompanyInfo from "../../_components/companyinfo";

interface ViewOrderProps {
  sales: GetSalesOrder;
}
function taxdisplay(sales: GetSalesOrder) {
  var result = [];
  for (let index = 0; index < sales.orderItems.length; index++) {
    const currenttax = sales.orderItems[index].product.productTax?.taxInPercent;
    const currentamount = sales.orderItems[index].taxAmount;

    if (currenttax != 0 && currentamount != 0) {
      if (result.length == 0) {
        result.push({ tax: currenttax, taxAmount: currentamount });
      } else {
        var isexist = false;
        for (let i = 0; i < result.length; i++) {
          if (result[i].tax == currenttax) {
            result[i].taxAmount += currentamount;
            isexist = true;
          }
        }
        if (!isexist) {
          result.push({ tax: currenttax, taxAmount: currentamount });
        }
      }
    }
  }
  return result;
}

const ViewSalesOrder = ({ sales }: ViewOrderProps) => {
  const componentRef = useRef(null);
  const { companyInfo } = useCompanyInfo();
  // const d = {
  //   name: "Sakthi Borewell Pvt Ltd",
  //   email: "sakthiborewell@gmail.com",
  //   phone: "984328596",
  //   address: "451, 1st Floor, 2nd Main Road, 2nd Stage, D-Block, Rajajinagar",
  //   city: "Thirukkanur",
  //   state: "Puducherry",
  //   pincode: "605501",
  //   country: "India",
  //   gstin: "44AAACU6767H1ZV",
  //   pan: "PQW1234567",
  // };

  // const enc = encrypt(JSON.stringify(d));
  // localStorage.setItem("companydetails", enc);
  // const decp = decrypt(localStorage.getItem("companydetails") || "");
  // if (!decp) {
  //   return <div>Company details not found</div>;
  // }
  // const companydetails = JSON.parse(decp);
  // console.log(companydetails.state);
  const interstate = companyInfo.state != sales.shippingAddress.state || false;
  // console.log(companydetails);
  return (
    <div className="space-y-3 space-x-3 mt-4">
      <div className="flex justify-end">
        <ReactToPrint
          trigger={() => (
            <Button variant={"print"}>
              <PrinterIcon className="w-4 h-4 mr-3" /> Print
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div ref={componentRef} className="m-8">
        <div className="border">
          <div className="border-b ">
            <div className="text-center font-bold border-b px-2 pt-2 pb-2">
              Sales Order
            </div>

            <div className="flex justify-between p-2">
              <div className="flex flex-col">
                <CompanyInfo />
                {/* <div className="text-start">
                   <div>Acme Inc.</div>
                  <div>
                    123 Main St
                    <br />
                    Springfield, IL 62701
                  </div> 
                </div> */}
              </div>
              <div>
                <div className="text-sm">
                  <span className="font-semibold mr-3">Order #:</span>
                  {sales.orderNo}
                </div>
                <div className="text-sm">
                  <span className="font-semibold mr-3">Order Date:</span>
                  {getFormattedDate(sales.orderDate)}
                </div>

                <div className="text-sm">
                  <span className="font-semibold mr-3">Mode of Payment: </span>
                  {sales.paymentMode.name}
                </div>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">Bill To</div>
                <div>{sales.billingAddress.name}</div>
                <div>
                  {sales.billingAddress.address}
                  <br />
                  {sales.billingAddress.city},
                  <br />
                  {sales.billingAddress.state}-{sales.billingAddress.pincode},
                  <br />
                  {sales.billingAddress.country}.
                </div>
              </div>
              <div className="text-end">
                <div className="font-bold">Deliver To</div>
                <div>{sales.shippingAddress.name}</div>
                <div>
                  {sales.shippingAddress.address}
                  <br />
                  {sales.shippingAddress.city},
                  <br />
                  {sales.shippingAddress.state}-{sales.shippingAddress.pincode},
                  <br />
                  {sales.shippingAddress.country}.
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 ">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Discount</th>
                  <th className="border p-2">Taxable Value</th>
                </tr>
              </thead>
              <tbody>
                {sales.orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.product.name}</td>
                    <td className="border p-2">{item.quantity} Nos</td>
                    <td className="border text-end p-2">
                      {getFormattedCurrency(item.price)}
                    </td>
                    <td className="border text-end p-2">
                      {getFormattedCurrency(item.discountAmount)}{" "}
                    </td>
                    <td className="border text-end p-2">
                      {getFormattedCurrency(item.subTotalAmount)}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={4} className="text-end p-2">
                    Sub Total
                  </td>
                  <td className="text-end p-2">
                    {getFormattedCurrency(sales.orderGrossAmount)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-end p-2">
                    {interstate ? (
                      <>
                        {taxdisplay(sales).map((item) => (
                          <div
                            key={item.tax}
                            className="flex flex-col items-end"
                          >
                            <div className="flex justify-end">
                              <div className="text-end p-2">
                                IGST @ {item.tax || 18} %
                              </div>
                              <div className="ml-32 py-2">
                                {getFormattedCurrency(item.taxAmount)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {taxdisplay(sales).map((item) => (
                          <div
                            key={item.tax}
                            className="flex flex-col items-end"
                          >
                            <div className="flex justify-end">
                              <div className="text-end p-2">
                                CGST @ {(item.tax || 18) / 2} %
                              </div>
                              <div className="ml-32 py-2">
                                {getFormattedCurrency(item.taxAmount / 2)}
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <div className="text-end p-2">
                                SGST @ {(item.tax || 18) / 2} %
                              </div>
                              <div className="ml-32 py-2">
                                {getFormattedCurrency(item.taxAmount / 2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end p-2">
                    Grand Total
                  </td>
                  <td className="text-end p-2 font-semibold">
                    {getFormattedCurrency(sales.orderTotalAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="border-b p-2">
            Amount in words:{" "}
            <span className="font-semibold">
              {price_in_words(sales.orderTotalAmount)} only
            </span>
          </p>

          <div className="flex">
            <div className="w-1/2">
              <div className="p-2">
                <p className="font-semibold">Terms & conditions:</p>
                <ol className="p-3">
                  <li className="list-decimal">
                    pri Goods once sold will not be taken back.{" "}
                  </li>
                  <li className="list-decimal">
                    Our risk and responsibility ceases as soon
                  </li>
                </ol>
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-end p-2">{companyInfo.name}</div>
              <div className="text-end p-2 mt-12">
                <div>Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSalesOrder;
