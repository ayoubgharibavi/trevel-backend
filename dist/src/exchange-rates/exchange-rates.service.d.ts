import { PrismaService } from '../prisma/prisma.service';
import { CreateExchangeRateDto, UpdateExchangeRateDto } from '../common/dto';
export declare class ExchangeRatesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllExchangeRates(): Promise<({
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
    })[]>;
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
    getExchangeRateByCurrencies(baseCurrencyId: string, targetCurrencyId: string): Promise<{
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
    getAllCurrencies(): Promise<{
        symbol: string;
        id: string;
        name: string;
        isActive: boolean;
        code: string;
        exchangeRateToUSD: number;
        isBaseCurrency: boolean;
    }[]>;
    convertCurrency(amount: number, fromCurrencyId: string, toCurrencyId: string): Promise<number>;
}
