import { Suspense } from "react";
import Loading from "@/app/admin/_components/loading";
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
import Link from "next/link";
import Breadcrumbs from "../../_components/Breadcrumbs";
import ProductForm from "../_components/ProductForm";

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const serieses = await db.productSeries.findMany();
  const puTypeApps = await db.pumpTypeApp.findMany();
  const puTypeIns = await db.pumpTypeInstallation.findMany();
  const powerHps = await db.powerInHP.findMany();
  const powerKws = await db.powerInKW.findMany();
  const phases = await db.phase.findMany();
  const voltages = await db.ratedVoltageINVolt.findMany();
  const suctions = await db.suctionSizeINMM.findMany();
  const deliveries = await db.deliverySizeINMM.findMany();
  const taxes = await db.productTax.findMany();
  const discounts = await db.discount.findMany();

  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    });
    if (!product) {
      return (
        <>
          <Breadcrumbs />
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col">
              <p>Product not found</p>
              <Link href="/admin/product">Back</Link>
            </div>
          </Suspense>
        </>
      );
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
              Product={product}
            />
          </Suspense>
        </div>
      </>
    );
  } catch (error: unknown) {
    return (
      <>
        <Breadcrumbs />
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col">
            <p>Product not found</p>
            {error instanceof Error && <p>{error.name}</p>}
            <Link href="/admin/product">Back</Link>
          </div>
        </Suspense>
      </>
    );
  }
};

export default EditProductPage;
