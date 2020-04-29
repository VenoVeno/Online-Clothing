import styled from 'styled-components';

export const CheckoutPageContainer = styled.div`
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;

    button{
        margin-left: auto;
    }

    @media screen and (max-width: 800px) {
        width: 90%;
    }
`;

export const CheckoutHeaderContainer = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const CheckoutHeaderBlockContainer = styled.div`
    text-transform: uppercase;
    width: 23%;

    &:last-child {
        width: 8%;
    }


    @media screen and (max-width: 800px) {
        width: 22%;

        &:first-child {
            width: 17%;
        }

        &:last-child {
            width: 12%;
        }
    }
`;

export const CheckoutTotalContainer = styled.div`
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;

    @media screen and (max-width: 800px) {
        font-size: 28px;
    }
`;

export const WarningContainer = styled.div`
    text-align: center;
    margin: 40px auto;
    font-size: 20px;
    color: red;

    @media screen and (max-width: 800px) {
        font-size: 18px;
    }
`;