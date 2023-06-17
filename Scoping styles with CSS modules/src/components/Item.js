import itemstyle from "./item.module.css";

export default function Item({ item }) {
  return (
    <div className={itemstyle.container}>
      <h3 className={itemstyle.title}>{item.title}</h3>
      <img src={item.image} alt={item.title} className={itemstyle.image} />
      <p>
        <strong className={itemstyle.price}>${item.price}</strong>
      </p>
      <p>{item.description}</p>
    </div>
  );
}
