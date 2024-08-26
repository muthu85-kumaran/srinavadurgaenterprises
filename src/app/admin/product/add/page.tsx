import React, { Suspense } from "react";
import ProductForm from "../_components/ProductForm";
import Breadcrumbs from "@/app/admin/_components/Breadcrumbs";
import db from "@/db/database";
import { PumpSeries } from "@/types/pumpSeries";
import { PumpTypeApp } from "@/types/pumpTypeApp";
import { PumpTypeIns } from "@/types/pumpTypeIns";
import { Phase } from "@/types/phase";
import { PowerHp } from "@/types/powerHp";
import { PowerKw } from "@/types/powerKw";
import { Suction } from "@/types/Suction";
import { Delivery } from "@/types/Delivery";
import { Voltage } from "@/types/Voltage";
import { ProductTax } from "@/types/ProductTax";
import { ProductDiscount } from "@/types/Discount";
import Loading from "@/app/admin/_components/loading";
import { listProductDiscountAction } from "@/actions/products/ProductDiscountAction";
import { listProductTaxAction } from "@/actions/products/ProductTaxAction";

const AddProduct = async () => {
  const serieses = await db.productSeries.findMany();
  const puTypeApps = await db.pumpTypeApp.findMany();
  const puTypeIns = await db.pumpTypeInstallation.findMany();
  const powerHps = await db.powerInHP.findMany();
  const powerKws = await db.powerInKW.findMany();
  const phases = await db.phase.findMany();
  const voltages = await db.ratedVoltageINVolt.findMany();
  const suctions = await db.suctionSizeINMM.findMany();
  const deliveries = await db.deliverySizeINMM.findMany();
  const taxesresult = await listProductTaxAction();
  var taxes: ProductTax[] = [];
  if (taxesresult.success) {
    taxes = taxesresult.data as ProductTax[];
  }
  const discountsresult = await listProductDiscountAction();
  var discounts: ProductDiscount[] = [];
  if (discountsresult) {
    discounts = discountsresult.data as ProductDiscount[];
  }

  return (
    <>
      <Breadcrumbs />
      <div className="w-full p-4">
        <Suspense fallback={<Loading />}>
          <ProductForm
            Series={serieses as unknown as PumpSeries[]}
            PumpTypeApps={puTypeApps as unknown as PumpTypeApp[]}
            PumpTypeIns={puTypeIns as unknown as PumpTypeIns[]}
            Phases={phases as unknown as Phase[]}
            PowerHps={powerHps as unknown as PowerHp[]}
            PowerKws={powerKws as unknown as PowerKw[]}
            Suctions={suctions as unknown as Suction[]}
            Deliveries={deliveries as unknown as Delivery[]}
            Voltages={voltages as unknown as Voltage[]}
            Taxes={taxes as unknown as ProductTax[]}
            Discounts={discounts as unknown as ProductDiscount[]}
          />
        </Suspense>
      </div>
    </>
  );
};

export default AddProduct;
