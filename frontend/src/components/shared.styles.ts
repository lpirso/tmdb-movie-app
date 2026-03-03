import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 8px 18px;
  color: white;
  font-weight: 600;
  border: none;
  text-transform: uppercase;
  font-size: 12px;
  height: fit-content;
  cursor: pointer;
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
`;

export const Select = styled.select`
  padding: 10px 14px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  font-size: 14px;
`;

export const Option = styled.option`
  background: black;
  color: white;
`;

export const Heading3 = styled.h3`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 300;
  font-size: 16px;
`;

export const Heading2 = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Heading1 = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;
