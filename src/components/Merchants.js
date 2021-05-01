import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format as formatDate } from "date-fns";
import { useQueryClient } from "react-query";

import { FcMoneyTransfer } from "react-icons/fc";
import Collapse from "../ui-library/collapse/Collapse";

import {
  useFetchMerchantsQuery,
  useUpdateMerchantMutation,
} from "../queries/merchants";

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

const MerchantTransactionsContainer = styled.div`
  margin-bottom: 10px;
`;

const MerchantTransaction = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MerchantBillButton = styled.button`
  cursor: pointer;
  display: flex;
  margin-left: auto;
  font-size: 14px;
`;

const Merchants = ({ isBill }) => {
  const { data: merchants } = useFetchMerchantsQuery();
  const updateMerchantMutation = useUpdateMerchantMutation();

  const queryClient = useQueryClient();

  const updateMerchant = (merchantId, update) =>
    updateMerchantMutation.mutate(
      {
        id: merchantId,
        requestBody: update,
      },
      {
        onSuccess: () => queryClient.invalidateQueries("merchants"),
      }
    );

  const handleRemoveBillButtonClick = (merchantId) =>
    updateMerchant(merchantId, { isBill: false });

  const handleAddBillButtonClick = (merchantId) =>
    updateMerchant(merchantId, { isBill: true });

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

  const renderMerchantCollapseContent = (merchant) => (
    <div>
      <MerchantTransactionsContainer>
        {merchant?.transactions?.map((transaction) => (
          <MerchantTransaction key={transaction.id}>
            <span>
              {formatDate(new Date(transaction.date), "MMMM do, yyyy")}
            </span>
            <span>{transaction.amount}£</span>
          </MerchantTransaction>
        ))}
      </MerchantTransactionsContainer>
      {merchant.isBill ? (
        <MerchantBillButton
          onClick={() => handleRemoveBillButtonClick(merchant.id)}
        >
          Remove Bill
        </MerchantBillButton>
      ) : (
        <MerchantBillButton
          onClick={() => handleAddBillButtonClick(merchant.id)}
        >
          Add as Bill
        </MerchantBillButton>
      )}
    </div>
  );

  if (!merchants || merchants.length === 0) return null;

  return merchants
    ?.filter((merchant) => merchant.isBill === isBill)
    .map((merchant) => (
      <MerchantCollapseContainer key={merchant.id}>
        <Collapse
          header={renderMerchantHeader(merchant)}
          content={renderMerchantCollapseContent(merchant)}
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
