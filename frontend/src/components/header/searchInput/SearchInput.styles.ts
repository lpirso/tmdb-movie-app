import styled from "styled-components";

export const SearchField = styled.input`
    padding: 10px 54px 10px 14px;
    border-radius: 6px;
    border: none;
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 14px;
    max-width: 800px;
    width: 100%;
    height: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

export const SearchFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export const CloseButton = styled.button`
    position: absolute;
    right: 32px;
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    border: none;
    width: 32px;
    height: 36px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};
`;
