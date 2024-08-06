"use client";
import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.COLORS.WHITE };
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  padding: 2rem;
  gap: 2rem;
`;

export const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  position: relative;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.COLORS.VIOLET};

  > img {
    border-radius: 20px;
  }
`;

export const CameraContainer = styled.label`
  cursor: pointer;
  border-radius: 50%;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.COLORS.VIOLET };
  position: absolute;
  bottom: -16px;
  right: -16px;

  input {
    display: none;
  }

  svg {
    cursor: pointer;
  }
`;

export const FieldsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  > button {
    align-self: flex-end;
  }

  > textarea {
    height: 30vh;
  }
`;

export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;