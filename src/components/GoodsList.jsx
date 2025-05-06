import { GoodsItem } from "./GoodsItem";

export function GoodsList({ goods=[], addToBasket}) {
  if (!goods.length) {
    return <h3> Not found</h3>;
  }

  return (
    <div className="goods">
      {goods.map((item, index)=>(
        <GoodsItem key= {index} {...item} addToBasket={addToBasket}/>
      ))}
    </div>
  );
}

  