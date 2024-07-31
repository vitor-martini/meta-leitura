"use client";
import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1.6rem;
  border-radius: 20px;
  overflow: hidden; 
  background-color: ${({ theme }) => theme.COLORS.WHITE };
  width: 320px;
  height: 360px;

  > p {
    margin: 0.8rem 0;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.DARK_BLUE };
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  padding: 1.6rem 2.4rem;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE };

  > h1 {
    color: ${({ theme }) => theme.COLORS.WHITE };
    font-size: 2.4rem;
  }
`;

export const CoverContainer = styled.div`
  width: 18rem;
  height: 24rem;
  position: relative;
  cursor: pointer;
  margin: 0.8rem 0;

  > img {
    border-radius: 20px;
  }
`;
