import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FcMoneyTransfer } from "react-icons/fc";
import { format as formatDate } from "date-fns";

import Collapse from "../ui-library/collapse/Collapse";

import { useFetchMerchantsQuery } from "../queries/merchants";

const ICON_SIZE = 32;

const MerchantHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const MerchantIcon = styled.img`
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
`;

const MerchantTitle = styled.span`
  font-weight: 600;
`;

const MerchantCollapseContainer = styled.div`
  margin: 10px;
`;

const MerchantTransaction = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Merchants = ({ isBill }) => {
  const { data: merchants } = useFetchMerchantsQuery();

  console.debug(navigator.language);

  const renderMerchantHeader = (merchant) => (
    <MerchantHeaderContainer>
      <MerchantTitle>{merchant.name}</MerchantTitle>
      {merchant.iconUrl ? (
        <MerchantIcon src={merchant.iconUrl} />
      ) : (
        <FcMoneyTransfer size={ICON_SIZE} />
      )}
    </MerchantHeaderContainer>
  );

  const renderMerchantTransactions = (merchant) =>
    merchant?.transactions?.map((transaction) => (
      <MerchantTransaction>
        <span>{formatDate(new Date(transaction.date), "MMMM do, yyyy")}</span>
        <span>{transaction.amount}£</span>
      </MerchantTransaction>
    ));

  if (!merchants || merchants.length === 0) return null;

  console.debug(merchants);

  return merchants
    ?.filter((merchant) => merchant.isBill === isBill)
    .map((merchant) => (
      <MerchantCollapseContainer>
        <Collapse
          header={renderMerchantHeader(merchant)}
          content={renderMerchantTransactions(merchant)}
        />
      </MerchantCollapseContainer>
    ));
};

Merchants.defaultProps = {
  isBill: false,
};

Merchants.propTypes = {
  isBill: PropTypes.bool.isRequired,
};

export default Merchants;
