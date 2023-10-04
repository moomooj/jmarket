import useSWR from "swr";
import Item from "./item";
import { ProductWithCount } from "pages";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  if (data) {
    console.log(data);
  }
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.id}
          key={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
