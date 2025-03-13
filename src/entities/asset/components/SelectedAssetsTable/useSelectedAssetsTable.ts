import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedAsset,
  selectedAssets,
  updateAssetFromWebSocket,
} from "../../model";
import { AppDispatch } from "../../../../app/providers";
import { TickerData, UseSelectedAssetsTable } from "./types";
import { SelectedAsset } from "../../model/types";
import { connectWebSocket, disconnectWebSocket } from "../../api";
import { useCallback, useEffect } from "react";

export const useSelectedAssetsTable =
  (): UseSelectedAssetsTable<SelectedAsset> => {
    const assets = useSelector(selectedAssets);

    const dispatch = useDispatch<AppDispatch>();

    const onAssetsUpdate = useCallback(
      (data: TickerData) => {
        const newAssetsInfo = assets.reduce<{
          portfolioTotal: number;
          assets: SelectedAsset[];
        }>(
          (acc, asset) => {
            if (asset.name === data.data.s) {
              acc.assets.push({
                ...asset,
                price: Number(data.data.a),
                sum: asset.count * Number(data.data.a),
              });
              acc.portfolioTotal += asset.sum;
            } else {
              acc.assets.push(asset);
              acc.portfolioTotal += asset.sum;
            }
            return acc;
          },
          {
            portfolioTotal: 0,
            assets: [],
          }
        );
        dispatch(updateAssetFromWebSocket(newAssetsInfo));
      },
      [assets, dispatch]
    );

    useEffect(() => {
      const queryParams = {
        streams: assets.reduce(
          (acc, asset, i) =>
            acc.concat(
              `${asset.name.toLowerCase()}@ticker${
                i !== assets.length - 1 ? "/" : ""
              }`
            ),
          ""
        ),
      };
      if (assets.length) {
        connectWebSocket<TickerData>({ queryParams, onAssetsUpdate });
      }

      return () => {
        disconnectWebSocket();
      };
    }, [assets, dispatch, onAssetsUpdate]);

    const removeAsset = (item: SelectedAsset) => {
      dispatch(removeSelectedAsset(item));
    };

    return {
      data: assets,
      onRowClick: removeAsset,
    };
  };
