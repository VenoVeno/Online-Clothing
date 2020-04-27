import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CollectionPreviewTitleContainer = styled.h1`
    font-size: 28px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        color: grey;
    }
`;

export const PreviewContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    & > div {
        margin-bottom: 30px;
    }

    @media screen and (max-width:800px){
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }
`;