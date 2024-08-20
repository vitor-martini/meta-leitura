"use client";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: none;
`;

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; 
`;

export const AccessKeyContainer = styled.div`
  > label {
    padding: 1.6rem;
  }
`;

export const AccessKeyWrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.COLORS.PURPLE};
  overflow: hidden;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  gap: 0.8rem;
  width: 100%;
  margin-top: 0.8rem;

  > svg {
    color: ${({ theme }) => theme.COLORS.LIGHT};
    background-color: ${({ theme }) => theme.COLORS.PURPLE};
    padding: 0 1.2rem;
    cursor: pointer;
  }

  > div {
    width: 100%;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  > div {
    width: 100%;
  }
`;

export const ModalButtonsContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;

  > button {
    box-shadow: 0 4px 8px rgba(0,0,0,0.5);

    &:first-child {
      background-color: ${({ theme }) => theme.COLORS.GREEN}
    }
  }
`;