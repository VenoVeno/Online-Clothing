import styled from 'styled-components';

export const SignInTitle = styled.h2`
    margin: 10px 0;
`;

export const SignInContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 380px) {        
        width: fill-available;

        ${SignInTitle} , span {
            text-align: center;
        }
    }
`;

export const SignInButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width : 380px) {
        flex-direction: column;
        button {
            width: 100%;
            align-items: center;
        }
    }
`;