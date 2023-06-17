//exporting component
export const Navbar = () => {
  return (
    //creating the UI
    <div className="navbar">
      <div className="logo" onClick={() => window.location.replace("/")}>
        <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/logo.png" alt="logo" />
        <span>PhotoFolio</span>
      </div>
    </div>
  );
};
