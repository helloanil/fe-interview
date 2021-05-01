import { useMutation, useQuery } from "react-query";

import { APIConstants } from "../shared/constants";

const MERCHANTS_URL = `${APIConstants.base}merchants`;

const getMerchants = async () => {
  const response = await fetch(MERCHANTS_URL);
  const responseJson = await response.json();

  return responseJson;
};

const patchMerchant = async (data) => {
  const response = await fetch(`${MERCHANTS_URL}/${data.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(data.requestBody),
  });
  const responseJson = await response.json();

  return responseJson;
};

export const useFetchMerchantsQuery = () => useQuery("merchants", getMerchants);

export const useUpdateMerchantMutation = () => useMutation(patchMerchant);
