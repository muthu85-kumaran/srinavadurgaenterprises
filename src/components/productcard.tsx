import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaBasketShopping } from "react-icons/fa6";
import { GetProductType } from "@/actions/products/productAction";

interface ProductCardProps {
  product: GetProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 p-3">
          <div>
            <Image
              className="w-auto h-auto"
              src={product.pImages[0].imageUrl}
              alt={product.name}
              width={250}
              height={250}
            />
          </div>
          <div></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <div>
            <Button>
              <FaBasketShopping size={18} className="mr-2" />
              Buy
            </Button>
          </div>
          {/* <div>
            <Button>sss</Button>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
