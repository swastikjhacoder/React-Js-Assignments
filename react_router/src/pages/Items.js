import { Link } from "react-router-dom";
import { ITEMS } from "../data/itemData";
function Items() {
  return (
    <>
      <main>
        <h1>Items Page</h1>
      </main>
      <ul>
        {ITEMS.map((item) => (
          <Link to={`/items/${item.id}`}>
            <li>{item.id}</li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export default Items;
