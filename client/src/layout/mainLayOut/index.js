import LayOutFooter from "./footer";
import LayOutHeader from "./header";

const MainLayOut = ({ children }) => {
  return (
    <div>
      <LayOutHeader />
      <div>{children}</div>
      <LayOutFooter />
    </div>
  );
};
export default MainLayOut;
