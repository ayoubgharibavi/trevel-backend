import { OnModuleInit } from '@nestjs/common';
import { AccountingSetupService } from './accounting-setup.service';
export declare class AccountingInitializationService implements OnModuleInit {
    private accountingSetup;
    constructor(accountingSetup: AccountingSetupService);
    onModuleInit(): Promise<void>;
}
