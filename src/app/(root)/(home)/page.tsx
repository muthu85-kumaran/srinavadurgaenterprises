import { listProductAction } from "@/actions/products/productAction";
import ProductCard from "@/components/productcard";
import { GetProductType } from "@/actions/products/productAction";
export default async function Home() {
  const products = (await listProductAction()).data!!;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-3">
        {products &&
          products.map((item, index) => (
            <ProductCard key={index} product={item}></ProductCard>
          ))}
      </div>
    </main>
  );
}
