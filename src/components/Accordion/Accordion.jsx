import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadShopSectionData } from '../../store/reducers/shop/shopSectionData';

import { ShopProductCard } from '..';


const Accordion = ({ title, id, shopId, data, setShowModal, setModalProduct }) => {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  const shopSectionData = useSelector(
    (state) => state.shopSectionData.shopSectionData
  );
  const shopSectionDataIsLoading = useSelector(
    (state) => state.shopSectionData.isLoading
  );
  const shopSectionDataError = useSelector(
    (state) => state.shopSectionData.error
  );

  useEffect(() => {
    if (isActive && shopId && id && shopSectionData.length == 0)
      dispatch(loadShopSectionData({ shopId, sectionId: id }));
  }, [isActive]);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className="accordion-content">
          {!data &&
            !shopSectionDataIsLoading &&
            !shopSectionDataError &&
            shopSectionData &&
            shopSectionData.map((p, i) => (
              <ShopProductCard product={p} key={i} />
            ))}
          {data && data.map((p, i) => (
            <ShopProductCard product={p} key={i} setModalProduct={setModalProduct} setShowModal={setShowModal} />))
          }
          {shopSectionData &&
            shopSectionData.map((p, i) => (
              <ShopProductCard product={p} key={i} setModalProduct={setModalProduct} setShowModal={setShowModal} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
