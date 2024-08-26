import React, { ReactNode } from "react";

const ProductLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default ProductLayout;
