import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  layoutSettings = { header: "", footer: "" },
  children,
  showFooter = true,
}) => {
  return (
    <>
      <div className="wrap">
        {showFooter && <Header headerSetting={layoutSettings.header} />}
          {children}
      </div>
     
    </>
  );
};

export default Layout;
