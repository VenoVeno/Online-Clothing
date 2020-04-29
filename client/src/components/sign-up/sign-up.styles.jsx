import styled from 'styled-components';

export const SignUpTitle = styled.h2`
    margin: 10px 0;
`;

export const SignUpContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px) {
        button {
            width: 100%;
        }
    }
    @media screen and (max-width: 380px) {        
        width: fill-available;

        ${SignUpTitle} , span {
            text-align: center;
        }
    }
`;
