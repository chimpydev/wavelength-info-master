import React, { useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GreyCard } from 'components/Card';
import { AutoColumn } from 'components/Column';
import { RowFixed, RowFlat } from 'components/Row';
import CurrencyLogo from 'components/CurrencyLogo';
import { TYPE, StyledInternalLink } from 'theme';
import { formatDollarAmount } from 'utils/numbers';
import Percent from 'components/Percent';
import HoverInlineText from 'components/HoverInlineText';
import { TokenData } from '../../data/balancer/balancerTypes';

const CardWrapper = styled(StyledInternalLink)`
    min-width: 190px;
    margin-right: 16px;

    :hover {
        cursor: pointer;
        opacity: 0.6;
    }
`;

const FixedContainer = styled(AutoColumn)``;

export const ScrollableRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const DataCard = ({ tokenData }: { tokenData: TokenData }) => {
    return (
        <CardWrapper to={'tokens/' + tokenData.address}>
            <GreyCard padding="16px">
                <RowFixed>
                    <CurrencyLogo address={tokenData.address} size="32px" />
                    <AutoColumn gap="3px" style={{ marginLeft: '12px' }}>
                        <TYPE.label fontSize="14px">
                            <HoverInlineText text={tokenData.symbol} />
                        </TYPE.label>
                        <RowFlat>
                            <TYPE.label fontSize="14px" mr="6px" lineHeight="16px">
                                {formatDollarAmount(tokenData.priceUSD)}
                            </TYPE.label>
                            <Percent fontSize="14px" value={tokenData.priceUSDChange} />
                        </RowFlat>
                    </AutoColumn>
                </RowFixed>
            </GreyCard>
        </CardWrapper>
    );
};

export default function TopTokenMovers({ tokenDatas }: { tokenDatas: TokenData[] }) {
    const topPriceIncrease = tokenDatas
        .sort((a, b) => {
            return a && b ? (Math.abs(a?.priceUSDChange) > Math.abs(b?.priceUSDChange) ? -1 : 1) : -1;
        })
        .slice(0, Math.min(20, tokenDatas.length));

    const increaseRef = useRef<HTMLDivElement>(null);
    const [increaseSet, setIncreaseSet] = useState(false);
    // const [pauseAnimation, setPauseAnimation] = useState(false)
    // const [resetInterval, setClearInterval] = useState<() => void | undefined>()

    useEffect(() => {
        if (!increaseSet && increaseRef && increaseRef.current) {
            setInterval(() => {
                if (increaseRef.current && increaseRef.current.scrollLeft !== increaseRef.current.scrollWidth) {
                    increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0);
                }
            }, 30);
            setIncreaseSet(true);
        }
    }, [increaseRef, increaseSet]);

    // function handleHover() {
    //   if (resetInterval) {
    //     resetInterval()
    //   }
    //   setPauseAnimation(true)
    // }

    return (
        <FixedContainer gap="md">
            <ScrollableRow ref={increaseRef}>
                {topPriceIncrease.map((data) =>
                    data ? <DataCard key={'top-card-token-' + data.address} tokenData={data} /> : null,
                )}
            </ScrollableRow>
        </FixedContainer>
    );
}
