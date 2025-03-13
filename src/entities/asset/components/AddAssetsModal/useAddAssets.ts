import { ChangeEvent, useEffect, useState } from "react";
import { allAssets, setSellectedAsset } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../../model/thunk";
import { AppDispatch } from "../../../../app/providers";
import { Asset } from "../../api";
import { debounce } from "../../../../shared/utils/debounce";
import { v4 as uuid } from "uuid";
import { SelectedAsset } from "../../model/types";

export const useAddAssetsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Asset[]>([]);
  const [currentAsset, setCurrentAsset] = useState<SelectedAsset | null>(null);
  const [assetQuantity, setAssetQuantity] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const assets = useSelector(allAssets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(assets);
  }, [assets]);

  useEffect(() => {
    const filterData = debounce(() => {
      setFilteredData((prev) =>
        search
          ? prev.filter((item) =>
              item.symbol.toLowerCase().includes(search.toLowerCase())
            )
          : assets
      );
    }, 500);

    filterData();
  }, [search, assets]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssetQuantity(Number(e.target.value || 0));
  };

  const onSelectAsset = (item: Asset) => {
    setCurrentAsset({
      id: uuid(),
      name: item.symbol,
      count: 0,
      price: Number(item.lastPrice || 0),
      sum: 0,
      change: Number(item.priceChangePercent || 0),
      share: 0,
    });
  };

  const onCancel = () => {
    setCurrentAsset(null);
    setAssetQuantity(0);
    setSearch("");
    toggleModal();
  };

  const onSubmit = () => {
    if (currentAsset) {
      const newAsset = {
        ...currentAsset,
        count: assetQuantity,
        sum: assetQuantity * (currentAsset.price || 0),
      };
      dispatch(setSellectedAsset(newAsset));
      setCurrentAsset(null);
      setAssetQuantity(0);
      toggleModal();
    }
  };

  return {
    data: filteredData,
    isModalOpen,
    toggleModal,
    search,
    onFilterChange,
    assetQuantity,
    onQuantityChange,
    onSelectAsset,
    isSelected: !!currentAsset,
    onCancel,
    onSubmit,
  };
};
