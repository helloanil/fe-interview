import { useQuery } from "react-query";

import { APIConstants } from "../shared/constants";

const MERCHANTS_URL = `${APIConstants.base}merchants`;

const getMerchants = async () => {
  const response = await fetch(MERCHANTS_URL);
  const responseJson = await response.json();

  return responseJson;
};

export const useFetchMerchantsQuery = () =>
  useQuery("mertchantsData", getMerchants);
