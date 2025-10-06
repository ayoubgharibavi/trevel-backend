"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_2 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const bigint_serializer_interceptor_1 = require("./common/interceptors/bigint-serializer.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://127.0.0.1:5175'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
        exposedHeaders: ['Content-Length', 'X-Requested-With'],
        preflightContinue: false,
        optionsSuccessStatus: 204
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    const reflector = app.get(core_2.Reflector);
    const jwtService = app.get(jwt_1.JwtService);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(jwtService, reflector, configService));
    app.useGlobalInterceptors(new bigint_serializer_interceptor_1.BigIntSerializerInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Trevel API')
        .setDescription('API documentation for Trevel backend')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map