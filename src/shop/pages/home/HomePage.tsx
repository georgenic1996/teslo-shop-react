import CustomPagination from "@/components/custom/CustomPagination";
import CustomJumbotron from "../../components/CustomJumbotron";
import ProductsGrid from "../../components/ProductsGrid";
import useProducts from "@/shop/hooks/useProducts";

const HomePage = () => {
  const { data } = useProducts();
  return (
    <>
      <CustomJumbotron title="Todos los Productos" />
      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};

export default HomePage;
