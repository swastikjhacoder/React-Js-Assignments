import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate(-1), 3000);
  }, []);

  return (
    <>
      <h1>OOOPPSSS!!!!! Something went wrong</h1>
    </>
  );
}

export default ErrorPage;
