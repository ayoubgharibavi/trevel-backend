import { ExchangeRatesService } from './exchange-rates.service';
import { CreateExchangeRateDto, UpdateExchangeRateDto } from '../common/dto';
export declare class ExchangeRatesController {
    private readonly exchangeRatesService;
    constructor(exchangeRatesService: ExchangeRatesService);
    getAllExchangeRates(): Promise<{
        lastUpdated: string | null;
        targetCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
        baseCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
        id: string;
        isActive: boolean;
        source: string;
        baseCurrencyId: string;
        targetCurrencyId: string;
        rate: number;
    }[]>;
    getAllCurrencies(): Promise<{
        symbol: string;
        id: string;
        name: string;
        isActive: boolean;
        code: string;
        exchangeRateToUSD: number;
        isBaseCurrency: boolean;
    }[]>;
    convertCurrency(amount: string, fromCurrencyId: string, toCurrencyId: string): Promise<{
        convertedAmount: number;
    }>;
    getExchangeRate(id: string): Promise<{
        targetCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
        baseCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
    } & {
        id: string;
        isActive: boolean;
        source: string;
        baseCurrencyId: string;
        targetCurrencyId: string;
        rate: number;
        lastUpdated: Date;
    }>;
    createExchangeRate(createExchangeRateDto: CreateExchangeRateDto): Promise<{
        targetCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
        baseCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
    } & {
        id: string;
        isActive: boolean;
        source: string;
        baseCurrencyId: string;
        targetCurrencyId: string;
        rate: number;
        lastUpdated: Date;
    }>;
    updateExchangeRate(id: string, updateExchangeRateDto: UpdateExchangeRateDto): Promise<{
        targetCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
        baseCurrency: {
            symbol: string;
            id: string;
            name: string;
            isActive: boolean;
            code: string;
            exchangeRateToUSD: number;
            isBaseCurrency: boolean;
        };
    } & {
        id: string;
        isActive: boolean;
        source: string;
        baseCurrencyId: string;
        targetCurrencyId: string;
        rate: number;
        lastUpdated: Date;
    }>;
    deleteExchangeRate(id: string): Promise<{
        id: string;
        isActive: boolean;
        source: string;
        baseCurrencyId: string;
        targetCurrencyId: string;
        rate: number;
        lastUpdated: Date;
    }>;
}
