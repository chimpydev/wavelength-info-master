import { useGetLatestPricesQuery } from '../../apollo/generated/graphql-codegen-generated';
import { useActiveNetworkVersion } from 'state/application/hooks';
import { FantomNetworkInfo, SupportedNetwork } from 'constants/networks';

//Fantom
const WFTM_ADDRESS = '0xc579D1f3CF86749E05CD06f7ADe17856c2CE3126';
const BEETS_ADDRESS = '0x5a60cE3D928c38Ee36B5104e98a42cf7B277f9C4';

export function useLatestPrices(): { ftm?: number; weth?: number, beets?: number, bal?: number, op?: number} {
    // eslint-disable-next-line
    const [activeNetwork] = useActiveNetworkVersion();
    const addressSetFtm = [WFTM_ADDRESS, BEETS_ADDRESS];
    const addresses = activeNetwork.chainId != FantomNetworkInfo.chainId ? addressSetFtm : addressSetFtm


    const { data } = useGetLatestPricesQuery({ 
        variables: { where: { asset_in: addresses } }, 
        context: {
            uri: activeNetwork.clientUri,
        }
    });
    
    const prices = data?.latestPrices || [];
    const ftm = prices.find((price) => price.asset === WFTM_ADDRESS);
    const beets = prices.find((price) => price.asset === BEETS_ADDRESS);

    return {
        ftm: ftm ? parseFloat(ftm.priceUSD) : undefined,
        beets: beets ? parseFloat(beets.priceUSD) : undefined,
    };
}