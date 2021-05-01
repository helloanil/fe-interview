import React from "react";
import PropTypes from "prop-types";

import Collapse from "../ui-library/collapse/Collapse";

import { useFetchMerchantsQuery } from "../queries/merchants";

const Merchants = ({ isBill }) => {
  const { data: merchants } = useFetchMerchantsQuery();

  const renderMerchantTransactions = (merchant) =>
    merchant?.transactions?.map((transaction) => (
      <div>
        {transaction.amount} - {transaction.date}
      </div>
    ));

  if (!merchants || merchants.length === 0) return null;

  return merchants
    ?.filter((merchant) => merchant.isBill === isBill)
    .map((merchant) => (
      <Collapse
        header={merchant.name}
        content={renderMerchantTransactions(merchant)}
      />
    ));
};

Merchants.defaultProps = {
  isBill: false,
};

Merchants.propTypes = {
  isBill: PropTypes.bool.isRequired,
};

export default Merchants;
