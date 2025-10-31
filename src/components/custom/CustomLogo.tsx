import { Link } from "react-router";

interface Props {
  subtitle?: string;
}

const CustomLogo = ({ subtitle }: Props) => {
  return (
    <Link to="/" className="flex items-center whitespace-nowrap">
      <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">
        Teslo | shop
      </span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">
        {subtitle}
      </p>
    </Link>
  );
};

export default CustomLogo;
