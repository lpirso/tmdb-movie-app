import styled from "styled-components";

export const MovieCardWrapper = styled.article`
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
`;

export const Poster = styled.img`
    border-radius: 10px 10px 0 0;
    max-width: 100%;
`;

export const MovieAttributesWrapper = styled.div`
    display: grid;
    gap: 8px;
    padding: 14px;
    border-right: 1px solid ${({ theme }) => theme.colors.backgroundSecondary};
    border-left: 1px solid ${({ theme }) => theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundSecondary};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const GenresWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 14px 14px;
    justify-content: end;
`;