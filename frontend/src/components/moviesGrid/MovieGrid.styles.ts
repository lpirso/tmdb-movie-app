import styled from "styled-components";

export const MovieGridWrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    width: 100%;
    padding: 40px;
`;