"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
let FlightsService = class FlightsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(query, user) {
        try {
            const { from, to, departureDate, adults = '1', children = '0', infants = '0' } = query;
            if (!from || !to || !departureDate) {
                throw new common_1.BadRequestException('Missing required search parameters');
            }
            const allAirports = await this.prisma.airport.findMany();
            const extractCityName = (input) => {
                return input.replace(/\s*\([A-Z]{3}\)\s*$/, '').trim();
            };
            const fromCity = extractCityName(from);
            const toCity = extractCityName(to);
            const departureAirport = allAirports.find(airport => {
                if (airport.iata === from.toUpperCase())
                    return true;
                try {
                    const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
                    return Object.values(cityNames).some((name) => name.toLowerCase() === fromCity.toLowerCase());
                }
                catch (error) {
                    return airport.city.toLowerCase() === fromCity.toLowerCase();
                }
            });
            const arrivalAirport = allAirports.find(airport => {
                if (airport.iata === to.toUpperCase())
                    return true;
                try {
                    const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
                    return Object.values(cityNames).some((name) => name.toLowerCase() === toCity.toLowerCase());
                }
                catch (error) {
                    return airport.city.toLowerCase() === toCity.toLowerCase();
                }
            });
            if (!departureAirport || !arrivalAirport) {
                return [];
            }
            const searchDateTime = new Date(departureDate);
            if (isNaN(searchDateTime.getTime())) {
                throw new common_1.BadRequestException('Invalid departure date');
            }
            const flights = await this.prisma.flight.findMany({
                where: {
                    departureAirportId: departureAirport.id,
                    arrivalAirportId: arrivalAirport.id,
                    departureTime: {
                        gte: new Date(searchDateTime.getFullYear(), searchDateTime.getMonth(), searchDateTime.getDate()),
                        lt: new Date(searchDateTime.getFullYear(), searchDateTime.getMonth(), searchDateTime.getDate() + 1),
                    },
                    status: 'ON_TIME',
                },
                include: {
                    departureAirport: true,
                    arrivalAirport: true,
                    airlineInfo: true,
                    aircraftInfo: true,
                    flightClassInfo: true,
                },
                take: 10,
            });
            return flights.map(flight => {
                const departureCityData = flight.departureAirport?.city ? JSON.parse(flight.departureAirport.city) : null;
                const departureNameData = flight.departureAirport?.name ? JSON.parse(flight.departureAirport.name) : null;
                const arrivalCityData = flight.arrivalAirport?.city ? JSON.parse(flight.arrivalAirport.city) : null;
                const arrivalNameData = flight.arrivalAirport?.name ? JSON.parse(flight.arrivalAirport.name) : null;
                const airlineNameData = flight.airlineInfo?.name ? JSON.parse(flight.airlineInfo.name) : null;
                const aircraftNameData = flight.aircraftInfo?.name ? JSON.parse(flight.aircraftInfo.name) : null;
                const flightClassNameData = flight.flightClassInfo?.name ? JSON.parse(flight.flightClassInfo.name) : null;
                return {
                    id: flight.id,
                    airline: airlineNameData?.fa || airlineNameData?.en || '',
                    airlineLogoUrl: flight.airlineLogoUrl,
                    flightNumber: flight.flightNumber,
                    departure: {
                        airportCode: flight.departureAirport?.iata || '',
                        airportName: departureNameData?.fa || departureNameData?.en || '',
                        city: departureCityData?.fa || departureCityData?.en || '',
                        dateTime: flight.departureTime.toISOString(),
                    },
                    arrival: {
                        airportCode: flight.arrivalAirport?.iata || '',
                        airportName: arrivalNameData?.fa || arrivalNameData?.en || '',
                        city: arrivalCityData?.fa || arrivalCityData?.en || '',
                        dateTime: flight.arrivalTime.toISOString(),
                    },
                    aircraft: aircraftNameData?.fa || aircraftNameData?.en || '',
                    flightClass: flightClassNameData?.fa || flightClassNameData?.en || '',
                    duration: `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`,
                    stops: flight.stops,
                    price: Number(flight.price),
                    taxes: Number(flight.taxes),
                    availableSeats: flight.availableSeats,
                    totalCapacity: flight.totalCapacity,
                    baggageAllowance: flight.baggageAllowance,
                    status: flight.status,
                };
            });
        }
        catch (error) {
            console.error('Error in flight search:', error);
            throw new common_1.BadRequestException('Internal server error during flight search');
        }
    }
    async getPopularRoutes() {
        const routes = await this.prisma.flight.groupBy({
            by: ['departureAirportId', 'arrivalAirportId'],
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: 'desc',
                },
            },
            take: 10,
        });
        const airports = await this.prisma.airport.findMany();
        const airportMap = new Map(airports.map(airport => [airport.id, airport]));
        return routes.map(route => {
            const departureAirport = route.departureAirportId ? airportMap.get(route.departureAirportId) : null;
            const arrivalAirport = route.arrivalAirportId ? airportMap.get(route.arrivalAirportId) : null;
            if (!departureAirport || !arrivalAirport)
                return null;
            const departureCityData = JSON.parse(departureAirport.city);
            const arrivalCityData = JSON.parse(arrivalAirport.city);
            return {
                from: departureCityData.fa || departureCityData.en,
                to: arrivalCityData.fa || arrivalCityData.en,
                count: route._count.id,
            };
        }).filter(Boolean);
    }
    async getById(flightId) {
        const flight = await this.prisma.flight.findUnique({
            where: { id: flightId },
            include: {
                departureAirport: true,
                arrivalAirport: true,
                airlineInfo: true,
                aircraftInfo: true,
                flightClassInfo: true,
            },
        });
        if (!flight) {
            throw new common_1.BadRequestException('Flight not found');
        }
        const departureCityData = flight.departureAirport?.city ? JSON.parse(flight.departureAirport.city) : null;
        const departureNameData = flight.departureAirport?.name ? JSON.parse(flight.departureAirport.name) : null;
        const arrivalCityData = flight.arrivalAirport?.city ? JSON.parse(flight.arrivalAirport.city) : null;
        const arrivalNameData = flight.arrivalAirport?.name ? JSON.parse(flight.arrivalAirport.name) : null;
        const airlineNameData = flight.airlineInfo?.name ? JSON.parse(flight.airlineInfo.name) : null;
        const aircraftNameData = flight.aircraftInfo?.name ? JSON.parse(flight.aircraftInfo.name) : null;
        const flightClassNameData = flight.flightClassInfo?.name ? JSON.parse(flight.flightClassInfo.name) : null;
        return {
            id: flight.id,
            airline: airlineNameData?.fa || airlineNameData?.en || '',
            airlineLogoUrl: flight.airlineInfo?.logoUrl || '',
            flightNumber: flight.flightNumber,
            departure: {
                airportCode: flight.departureAirport?.iata || '',
                airportName: departureNameData?.fa || departureNameData?.en || '',
                city: departureCityData?.fa || departureCityData?.en || '',
                dateTime: flight.departureTime.toISOString(),
            },
            arrival: {
                airportCode: flight.arrivalAirport?.iata || '',
                airportName: arrivalNameData?.fa || arrivalNameData?.en || '',
                city: arrivalCityData?.fa || arrivalCityData?.en || '',
                dateTime: flight.arrivalTime.toISOString(),
            },
            aircraft: aircraftNameData?.fa || aircraftNameData?.en || '',
            flightClass: flightClassNameData?.fa || flightClassNameData?.en || '',
            duration: `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`,
            stops: flight.stops,
            price: Number(flight.price),
            taxes: Number(flight.taxes),
            availableSeats: flight.availableSeats,
            totalCapacity: flight.totalCapacity,
            baggageAllowance: flight.baggageAllowance,
            status: flight.status,
        };
    }
    async aiSearch(query, language = 'fa', user) {
        try {
            const { from, to, departureDate } = query;
            const cityToAirportMap = {
                'تهران': { code: 'IKA', name: 'فرودگاه امام خمینی' },
                'مشهد': { code: 'MHD', name: 'فرودگاه شهید هاشمی نژاد' },
                'دبی': { code: 'DXB', name: 'فرودگاه بین‌المللی دبی' },
                'استانبول': { code: 'IST', name: 'فرودگاه بین‌المللی استانبول' },
                'اصفهان': { code: 'IFN', name: 'فرودگاه بین‌المللی اصفهان' },
                'شیراز': { code: 'SYZ', name: 'فرودگاه بین‌المللی شیراز' },
                'تبریز': { code: 'TBZ', name: 'فرودگاه بین‌المللی تبریز' },
                'اهواز': { code: 'AWZ', name: 'فرودگاه بین‌المللی اهواز' },
                'کرمان': { code: 'KER', name: 'فرودگاه بین‌المللی کرمان' },
                'یزد': { code: 'AZD', name: 'فرودگاه بین‌المللی یزد' }
            };
            const fromAirport = cityToAirportMap[from] || { code: 'IKA', name: 'فرودگاه امام خمینی' };
            const toAirport = cityToAirportMap[to] || { code: 'MHD', name: 'فرودگاه شهید هاشمی نژاد' };
            let duration = '2h 30m';
            let durationMinutes = 150;
            if (from === 'تهران' && to === 'دبی') {
                duration = '3h 30m';
                durationMinutes = 210;
            }
            else if (from === 'تهران' && to === 'مشهد') {
                duration = '1h 30m';
                durationMinutes = 90;
            }
            const flightId = `ai-generated-${Date.now()}`;
            const mockFlights = [
                {
                    id: flightId,
                    airline: 'ایران ایر',
                    airlineLogoUrl: '/images/iran-air-logo.png',
                    flightNumber: 'IR1234',
                    departure: {
                        airportCode: fromAirport.code,
                        airportName: fromAirport.name,
                        city: from,
                        dateTime: new Date(departureDate + 'T08:00:00Z').toISOString(),
                    },
                    arrival: {
                        airportCode: toAirport.code,
                        airportName: toAirport.name,
                        city: to,
                        dateTime: new Date(new Date(departureDate + 'T08:00:00Z').getTime() + durationMinutes * 60 * 1000).toISOString(),
                    },
                    duration: duration,
                    stops: 0,
                    price: 1500000,
                    taxes: 150000,
                    flightClass: 'اقتصادی',
                    aircraft: 'Boeing 737',
                    availableSeats: 25,
                    baggageAllowance: '20 کیلوگرم',
                }
            ];
            try {
                const departureAirport = await this.prisma.airport.upsert({
                    where: { iata: fromAirport.code },
                    update: {},
                    create: {
                        iata: fromAirport.code,
                        icao: fromAirport.code === 'IKA' ? 'OIIE' : fromAirport.code === 'DXB' ? 'OMDB' : 'OIIE',
                        name: JSON.stringify({ fa: fromAirport.name, en: fromAirport.name }),
                        city: JSON.stringify({ fa: from, en: from }),
                        country: JSON.stringify({ fa: 'ایران', en: 'Iran' })
                    }
                });
                const arrivalAirport = await this.prisma.airport.upsert({
                    where: { iata: toAirport.code },
                    update: {},
                    create: {
                        iata: toAirport.code,
                        icao: toAirport.code === 'MHD' ? 'OIMM' : toAirport.code === 'DXB' ? 'OMDB' : 'OIMM',
                        name: JSON.stringify({ fa: toAirport.name, en: toAirport.name }),
                        city: JSON.stringify({ fa: to, en: to }),
                        country: JSON.stringify({ fa: 'ایران', en: 'Iran' })
                    }
                });
                await this.prisma.flight.upsert({
                    where: { id: flightId },
                    update: {},
                    create: {
                        id: flightId,
                        flightNumber: 'IR1234',
                        airline: 'ایران ایر',
                        aircraft: 'Boeing 737',
                        flightClass: 'اقتصادی',
                        duration: durationMinutes,
                        price: BigInt(1500000),
                        taxes: BigInt(150000),
                        availableSeats: 25,
                        totalCapacity: 150,
                        airlineId: undefined,
                        aircraftId: undefined,
                        flightClassId: undefined,
                        departureAirportId: departureAirport.id,
                        arrivalAirportId: arrivalAirport.id,
                        departureTime: new Date(departureDate + 'T08:00:00Z'),
                        arrivalTime: new Date(departureDate + 'T09:30:00Z'),
                        status: 'ON_TIME'
                    }
                });
                console.log('✅ AI-generated flight saved to database:', flightId);
            }
            catch (dbError) {
                console.error('❌ Error saving AI flight to database:', dbError);
            }
            return mockFlights;
        }
        catch (error) {
            console.error('Error in AI search:', error);
            throw new common_1.BadRequestException('Internal server error during flight search');
        }
    }
    async autoCancelPastFlights() {
        try {
            const now = new Date();
            console.log(`🕐 Running auto-cancel check at ${now.toISOString()}`);
            const pastFlights = await this.prisma.flight.findMany({
                where: {
                    status: 'ON_TIME',
                    departureTime: {
                        lt: now
                    }
                }
            });
            if (pastFlights.length === 0) {
                console.log('✅ No past flights found to cancel');
                return;
            }
            console.log(`📋 Found ${pastFlights.length} past flights to cancel`);
            for (const flight of pastFlights) {
                await this.prisma.flight.update({
                    where: { id: flight.id },
                    data: {
                        status: 'CANCELLED',
                        updatedAt: now
                    }
                });
                const relatedBookings = await this.prisma.booking.findMany({
                    where: {
                        flightId: flight.id,
                        status: {
                            in: ['CONFIRMED', 'PENDING']
                        }
                    }
                });
                if (relatedBookings.length > 0) {
                    await this.prisma.booking.updateMany({
                        where: {
                            flightId: flight.id,
                            status: {
                                in: ['CONFIRMED', 'PENDING']
                            }
                        },
                        data: {
                            status: 'CANCELLED'
                        }
                    });
                    console.log(`✈️ Flight ${flight.flightNumber} cancelled - ${relatedBookings.length} bookings affected`);
                }
                else {
                    console.log(`✈️ Flight ${flight.flightNumber} cancelled - no active bookings`);
                }
            }
            console.log(`✅ Auto-cancel completed: ${pastFlights.length} flights cancelled`);
        }
        catch (error) {
            console.error('❌ Error in auto-cancel past flights:', error);
        }
    }
    async cancelPastFlights() {
        try {
            const now = new Date();
            const pastFlights = await this.prisma.flight.findMany({
                where: {
                    status: 'ON_TIME',
                    departureTime: {
                        lt: now
                    }
                }
            });
            const results = [];
            for (const flight of pastFlights) {
                const updatedFlight = await this.prisma.flight.update({
                    where: { id: flight.id },
                    data: {
                        status: 'CANCELLED',
                        updatedAt: now
                    }
                });
                const relatedBookings = await this.prisma.booking.findMany({
                    where: {
                        flightId: flight.id,
                        status: {
                            in: ['CONFIRMED', 'PENDING']
                        }
                    }
                });
                let cancelledBookings = 0;
                if (relatedBookings.length > 0) {
                    const bookingUpdate = await this.prisma.booking.updateMany({
                        where: {
                            flightId: flight.id,
                            status: {
                                in: ['CONFIRMED', 'PENDING']
                            }
                        },
                        data: {
                            status: 'CANCELLED'
                        }
                    });
                    cancelledBookings = bookingUpdate.count;
                }
                results.push({
                    flightId: flight.id,
                    flightNumber: flight.flightNumber,
                    departureTime: flight.departureTime,
                    cancelledBookings: cancelledBookings
                });
            }
            return {
                success: true,
                message: `${results.length} past flights cancelled successfully`,
                cancelledFlights: results
            };
        }
        catch (error) {
            console.error('Error cancelling past flights:', error);
            throw new common_1.BadRequestException('Failed to cancel past flights');
        }
    }
    async createFlight(createFlightDto) {
        const { departure, arrival, allotments, ...rest } = createFlightDto;
        console.log('🔍 createFlight - departure:', departure);
        console.log('🔍 createFlight - arrival:', arrival);
        const [airlines, aircrafts, flightClasses, airports] = await Promise.all([
            this.prisma.airline.findMany(),
            this.prisma.aircraft.findMany(),
            this.prisma.flightClass.findMany(),
            this.prisma.airport.findMany(),
        ]);
        const airlineRecord = airlines.find(airline => {
            if (airline.id === rest.airline)
                return true;
            const airlineNames = typeof airline.name === 'string' ? JSON.parse(airline.name) : airline.name;
            return Object.values(airlineNames).some((name) => name && typeof name === 'string' && name.toLowerCase() === rest.airline?.toLowerCase());
        });
        const aircraftRecord = aircrafts.find(aircraft => {
            if (aircraft.id === rest.aircraft)
                return true;
            const aircraftNames = typeof aircraft.name === 'string' ? JSON.parse(aircraft.name) : aircraft.name;
            return Object.values(aircraftNames).some((name) => name && typeof name === 'string' && name.toLowerCase() === rest.aircraft?.toLowerCase());
        });
        console.log('🔍 Looking for flightClass:', rest.flightClass);
        console.log('🔍 Available flight classes:', flightClasses.map(fc => ({ id: fc.id, name: fc.name })));
        const flightClassRecord = flightClasses.find(fc => {
            if (fc.id === rest.flightClass)
                return true;
            const flightClassNames = typeof fc.name === 'string' ? JSON.parse(fc.name) : fc.name;
            return Object.values(flightClassNames).some((name) => name && typeof name === 'string' && name.toLowerCase() === rest.flightClass?.toLowerCase());
        });
        console.log('🔍 Found flightClassRecord:', flightClassRecord);
        const departureAirport = airports.find(airport => {
            if (departure.airportId && airport.id === departure.airportId)
                return true;
            if (departure.airportCode && airport.iata === departure.airportCode)
                return true;
            if (!departure.city)
                return false;
            const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
            return Object.values(cityNames).some((name) => name && typeof name === 'string' && name.toLowerCase() === departure.city?.toLowerCase());
        });
        const arrivalAirport = airports.find(airport => {
            if (arrival.airportId && airport.id === arrival.airportId)
                return true;
            if (arrival.airportCode && airport.iata === arrival.airportCode)
                return true;
            if (!arrival.city)
                return false;
            const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
            return Object.values(cityNames).some((name) => name && typeof name === 'string' && name.toLowerCase() === arrival.city?.toLowerCase());
        });
        if (!airlineRecord) {
            throw new common_1.BadRequestException(`Airline not found: ${rest.airline}`);
        }
        if (!aircraftRecord) {
            throw new common_1.BadRequestException(`Aircraft not found: ${rest.aircraft}`);
        }
        if (!flightClassRecord) {
            throw new common_1.BadRequestException(`Flight class not found: ${rest.flightClass}`);
        }
        if (!departureAirport) {
            const identifier = departure.airportId || departure.airportCode || departure.city || 'unknown';
            throw new common_1.BadRequestException(`Departure airport not found: ${identifier}`);
        }
        if (!arrivalAirport) {
            const identifier = arrival.airportId || arrival.airportCode || arrival.city || 'unknown';
            throw new common_1.BadRequestException(`Arrival airport not found: ${identifier}`);
        }
        let validCreatorId = rest.creatorId;
        if (validCreatorId) {
            const creatorExists = await this.prisma.user.findUnique({
                where: { id: validCreatorId }
            });
            if (!creatorExists) {
                console.warn(`Creator ID ${validCreatorId} not found, using admin-1`);
                validCreatorId = 'admin-1';
            }
        }
        else {
            validCreatorId = 'admin-1';
        }
        let validTenantId = rest.tenantId;
        if (validTenantId) {
            const tenantExists = await this.prisma.tenant.findUnique({
                where: { id: validTenantId }
            });
            if (!tenantExists) {
                console.warn(`Tenant ID ${validTenantId} not found, using tenant-1`);
                validTenantId = 'tenant-1';
            }
        }
        else {
            validTenantId = 'tenant-1';
        }
        let validCommissionModelId = rest.commissionModelId;
        if (validCommissionModelId && validCommissionModelId.trim() !== '') {
            const commissionModelExists = await this.prisma.commissionModel.findUnique({
                where: { id: validCommissionModelId }
            });
            if (!commissionModelExists) {
                console.warn(`Commission Model ID ${validCommissionModelId} not found, using null`);
                validCommissionModelId = undefined;
            }
        }
        else {
            validCommissionModelId = undefined;
        }
        let validRefundPolicyId = rest.refundPolicyId;
        if (validRefundPolicyId && validRefundPolicyId.trim() !== '') {
            const refundPolicyExists = await this.prisma.refundPolicy.findUnique({
                where: { id: validRefundPolicyId }
            });
            if (!refundPolicyExists) {
                console.warn(`Refund Policy ID ${validRefundPolicyId} not found, using null`);
                validRefundPolicyId = undefined;
            }
        }
        else {
            validRefundPolicyId = undefined;
        }
        console.log('🔍 Flight creation data:', {
            airlineId: airlineRecord.id,
            aircraftId: aircraftRecord.id,
            flightClassId: flightClassRecord.id,
            departureAirportId: departureAirport.id,
            arrivalAirportId: arrivalAirport.id,
            creatorId: validCreatorId,
            tenantId: validTenantId,
            commissionModelId: validCommissionModelId,
            refundPolicyId: validRefundPolicyId,
            allotmentsCount: allotments?.length || 0
        });
        const newFlight = await this.prisma.flight.create({
            data: {
                airline: rest.airline,
                aircraft: rest.aircraft,
                flightClass: rest.flightClass,
                flightNumber: rest.flightNumber,
                price: rest.price,
                taxes: rest.taxes || 0,
                airlineLogoUrl: airlineRecord.logoUrl,
                airlineId: airlineRecord.id,
                aircraftId: aircraftRecord.id,
                flightClassId: flightClassRecord.id,
                departureAirportId: departureAirport.id,
                departureTerminal: departure.terminal,
                departureTime: new Date(departure.scheduledTime || new Date()),
                departureGate: departure.gate,
                arrivalAirportId: arrivalAirport.id,
                arrivalTerminal: arrival.terminal,
                arrivalTime: new Date(arrival.scheduledTime || new Date()),
                arrivalGate: arrival.gate,
                duration: rest.duration || 120,
                stops: rest.stops || 0,
                availableSeats: rest.availableSeats || aircraftRecord.capacity || 100,
                totalCapacity: rest.totalCapacity || aircraftRecord.capacity || 100,
                commissionModelId: validCommissionModelId,
                refundPolicyId: validRefundPolicyId,
                creatorId: validCreatorId,
                tenantId: validTenantId,
                allotments: allotments && allotments.length > 0 && validCreatorId ? {
                    create: allotments.map(allotment => ({
                        agentId: validCreatorId,
                        seats: allotment.seats || 0,
                        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    })),
                } : undefined,
            },
            include: {
                allotments: true,
                departureAirport: true,
                arrivalAirport: true,
                airlineInfo: true,
                aircraftInfo: true,
                flightClassInfo: true,
            },
        });
        const departureCityData = JSON.parse(departureAirport.city);
        const departureNameData = JSON.parse(departureAirport.name);
        const arrivalCityData = JSON.parse(arrivalAirport.city);
        const arrivalNameData = JSON.parse(arrivalAirport.name);
        const airlineNameData = JSON.parse(airlineRecord.name);
        const aircraftNameData = JSON.parse(aircraftRecord.name);
        const flightClassNameData = JSON.parse(flightClassRecord.name);
        return {
            id: newFlight.id,
            airline: airlineNameData.fa || airlineNameData.en,
            airlineLogoUrl: newFlight.airlineLogoUrl,
            flightNumber: newFlight.flightNumber,
            departure: {
                airportCode: newFlight.departureAirport?.iata || '',
                airportName: departureNameData.fa || departureNameData.en,
                city: departureCityData.fa || departureCityData.en,
                dateTime: newFlight.departureTime.toISOString(),
            },
            arrival: {
                airportCode: newFlight.arrivalAirport?.iata || '',
                airportName: arrivalNameData.fa || arrivalNameData.en,
                city: arrivalCityData.fa || arrivalCityData.en,
                dateTime: newFlight.arrivalTime.toISOString(),
            },
            aircraft: aircraftNameData.fa || aircraftNameData.en,
            flightClass: flightClassNameData.fa || flightClassNameData.en,
            duration: `${Math.floor(newFlight.duration / 60)}h ${newFlight.duration % 60}m`,
            stops: newFlight.stops,
            price: Number(newFlight.price),
            taxes: Number(newFlight.taxes),
            availableSeats: newFlight.availableSeats,
            totalCapacity: newFlight.totalCapacity,
            baggageAllowance: newFlight.baggageAllowance,
            status: newFlight.status,
            bookingClosesBeforeDepartureHours: newFlight.bookingClosesBeforeDepartureHours,
            sourcingType: newFlight.sourcingType,
            commissionModelId: newFlight.commissionModelId,
            refundPolicyId: newFlight.refundPolicyId,
            creatorId: newFlight.creatorId,
            tenantId: newFlight.tenantId,
            allotments: newFlight.allotments || [],
        };
    }
    async updateFlight(flightId, updateFlightDto) {
        const { departure, arrival, allotments, createdAt, updatedAt, commissionModelId, refundPolicyId, departureAirport, arrivalAirport, airlineInfo, aircraftInfo, flightClassInfo, commissionModel, refundPolicy, creator, ...rest } = updateFlightDto;
        const updatedFlight = await this.prisma.flight.update({
            where: { id: flightId },
            data: {
                ...rest,
                ...(departure && {
                    departureTime: new Date(departure.scheduledTime || new Date()),
                    departureTerminal: departure.terminal,
                    departureGate: departure.gate,
                }),
                ...(arrival && {
                    arrivalTime: new Date(arrival.scheduledTime || new Date()),
                    arrivalTerminal: arrival.terminal,
                    arrivalGate: arrival.gate,
                }),
                ...(allotments && {
                    allotments: {
                        deleteMany: {},
                        create: allotments.map(allotment => ({
                            agentId: rest.creatorId || 'admin-1',
                            seats: allotment.seats || 0,
                            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        })),
                    },
                }),
            },
            include: {
                allotments: true,
                departureAirport: true,
                arrivalAirport: true,
                airlineInfo: true,
                aircraftInfo: true,
                flightClassInfo: true,
            },
        });
        const departureCityData = updatedFlight.departureAirport?.city ? JSON.parse(updatedFlight.departureAirport.city) : null;
        const departureNameData = updatedFlight.departureAirport?.name ? JSON.parse(updatedFlight.departureAirport.name) : null;
        const arrivalCityData = updatedFlight.arrivalAirport?.city ? JSON.parse(updatedFlight.arrivalAirport.city) : null;
        const arrivalNameData = updatedFlight.arrivalAirport?.name ? JSON.parse(updatedFlight.arrivalAirport.name) : null;
        const airlineNameData = updatedFlight.airlineInfo?.name ? JSON.parse(updatedFlight.airlineInfo.name) : null;
        const aircraftNameData = updatedFlight.aircraftInfo?.name ? JSON.parse(updatedFlight.aircraftInfo.name) : null;
        const flightClassNameData = updatedFlight.flightClassInfo?.name ? JSON.parse(updatedFlight.flightClassInfo.name) : null;
        return {
            id: updatedFlight.id,
            airline: airlineNameData?.fa || airlineNameData?.en || '',
            airlineLogoUrl: updatedFlight.airlineLogoUrl,
            flightNumber: updatedFlight.flightNumber,
            departure: {
                airportCode: updatedFlight.departureAirport?.iata || '',
                airportName: departureNameData?.fa || departureNameData?.en || '',
                city: departureCityData?.fa || departureCityData?.en || '',
                dateTime: updatedFlight.departureTime.toISOString(),
            },
            arrival: {
                airportCode: updatedFlight.arrivalAirport?.iata || '',
                airportName: arrivalNameData?.fa || arrivalNameData?.en || '',
                city: arrivalCityData?.fa || arrivalCityData?.en || '',
                dateTime: updatedFlight.arrivalTime.toISOString(),
            },
            aircraft: aircraftNameData?.fa || aircraftNameData?.en || '',
            flightClass: flightClassNameData?.fa || flightClassNameData?.en || '',
            duration: `${Math.floor(updatedFlight.duration / 60)}h ${updatedFlight.duration % 60}m`,
            stops: updatedFlight.stops,
            price: Number(updatedFlight.price),
            taxes: Number(updatedFlight.taxes),
            availableSeats: updatedFlight.availableSeats,
            totalCapacity: updatedFlight.totalCapacity,
            baggageAllowance: updatedFlight.baggageAllowance,
            status: updatedFlight.status,
            bookingClosesBeforeDepartureHours: updatedFlight.bookingClosesBeforeDepartureHours,
            sourcingType: updatedFlight.sourcingType,
            commissionModelId: updatedFlight.commissionModelId,
            refundPolicyId: updatedFlight.refundPolicyId,
            creatorId: updatedFlight.creatorId,
            tenantId: updatedFlight.tenantId,
            allotments: updatedFlight.allotments || [],
        };
    }
    async deleteFlight(flightId) {
        try {
            await this.prisma.booking.deleteMany({
                where: { flightId: flightId }
            });
            await this.prisma.seatAllotment.deleteMany({
                where: { flightId: flightId }
            });
            const deletedFlight = await this.prisma.flight.delete({
                where: { id: flightId }
            });
            return deletedFlight;
        }
        catch (error) {
            console.error('Error deleting flight:', error);
            throw new common_1.BadRequestException('Failed to delete flight');
        }
    }
    async searchAirports(searchTerm) {
        const airports = await this.prisma.airport.findMany({
            where: {
                OR: [
                    { iata: { contains: searchTerm } },
                    { city: { contains: searchTerm } },
                    { name: { contains: searchTerm } },
                ],
            },
            take: 10,
        });
        return airports.map(airport => {
            let cityData, nameData, countryData;
            try {
                cityData = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
                nameData = typeof airport.name === 'string' ? JSON.parse(airport.name) : airport.name;
                countryData = typeof airport.country === 'string' ? JSON.parse(airport.country) : airport.country;
            }
            catch (error) {
                cityData = airport.city;
                nameData = airport.name;
                countryData = airport.country;
            }
            return {
                id: airport.id,
                code: airport.iata,
                city: cityData.fa || cityData.en || cityData,
                name: nameData.fa || nameData.en || nameData,
                country: countryData.fa || countryData.en || countryData,
                isActive: true,
            };
        });
    }
    async getDailyPrices(from, to, month) {
        try {
            const targetMonth = month ? new Date(month + '-01') : new Date();
            const year = targetMonth.getFullYear();
            const monthNum = targetMonth.getMonth();
            const allAirports = await this.prisma.airport.findMany();
            const extractCityName = (input) => {
                return input.replace(/\s*\([A-Z]{3}\)\s*$/, '').trim();
            };
            const fromCity = extractCityName(from);
            const toCity = extractCityName(to);
            const departureAirport = allAirports.find(airport => {
                if (airport.iata === from.toUpperCase())
                    return true;
                const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
                return Object.values(cityNames).some((name) => name.toLowerCase() === fromCity.toLowerCase());
            });
            const arrivalAirport = allAirports.find(airport => {
                if (airport.iata === to.toUpperCase())
                    return true;
                const cityNames = typeof airport.city === 'string' ? JSON.parse(airport.city) : airport.city;
                return Object.values(cityNames).some((name) => name.toLowerCase() === toCity.toLowerCase());
            });
            if (!departureAirport || !arrivalAirport) {
                throw new common_1.BadRequestException('Invalid departure or arrival airport/city');
            }
            const startDate = new Date(year, monthNum, 1);
            const endDate = new Date(year, monthNum + 1, 0);
            const flights = await this.prisma.flight.findMany({
                where: {
                    departureTime: {
                        gte: startDate,
                        lte: endDate,
                    },
                    departureAirportId: departureAirport.id,
                    arrivalAirportId: arrivalAirport.id,
                },
                select: {
                    id: true,
                    departureTime: true,
                    price: true,
                    taxes: true,
                },
            });
            const dailyPrices = {};
            flights.forEach(flight => {
                const date = flight.departureTime.toISOString().split('T')[0];
                const totalPrice = Number(flight.price) + Number(flight.taxes);
                if (!dailyPrices[date] || totalPrice < dailyPrices[date]) {
                    dailyPrices[date] = totalPrice;
                }
            });
            const daysInMonth = endDate.getDate();
            const result = [];
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, monthNum, day);
                const dateString = date.toISOString().split('T')[0];
                if (date < new Date())
                    continue;
                const price = dailyPrices[dateString];
                if (price) {
                    result.push({
                        date: dateString,
                        price: price,
                        isLowest: false,
                    });
                }
            }
            if (result.length > 0) {
                const lowestPrice = Math.min(...result.map(r => r.price));
                result.forEach(item => {
                    if (item.price === lowestPrice) {
                        item.isLowest = true;
                    }
                });
            }
            return {
                success: true,
                data: result,
                month: `${year}-${String(monthNum + 1).padStart(2, '0')}`,
            };
        }
        catch (error) {
            console.error('Error getting daily prices:', error);
            throw new common_1.BadRequestException('Failed to get daily prices');
        }
    }
    async saveCharter118Flight(flight, charter118BookingId) {
        try {
            console.log('🔍 Saving Charter118 flight to database:', flight.id);
            const departureAirport = await this.prisma.airport.upsert({
                where: { iata: flight.departure.airportCode },
                update: {},
                create: {
                    iata: flight.departure.airportCode,
                    icao: flight.departure.airportCode === 'IKA' ? 'OIIE' : flight.departure.airportCode === 'DXB' ? 'OMDB' : 'OIIE',
                    name: JSON.stringify({ fa: flight.departure.airportName, en: flight.departure.airportName }),
                    city: JSON.stringify({ fa: flight.departure.city, en: flight.departure.city }),
                    country: JSON.stringify({ fa: 'ایران', en: 'Iran' })
                }
            });
            const arrivalAirport = await this.prisma.airport.upsert({
                where: { iata: flight.arrival.airportCode },
                update: {},
                create: {
                    iata: flight.arrival.airportCode,
                    icao: flight.arrival.airportCode === 'DXB' ? 'OMDB' : flight.arrival.airportCode === 'IKA' ? 'OIIE' : 'OMDB',
                    name: JSON.stringify({ fa: flight.arrival.airportName, en: flight.arrival.airportName }),
                    city: JSON.stringify({ fa: flight.arrival.city, en: flight.arrival.city }),
                    country: JSON.stringify({ fa: 'امارات', en: 'UAE' })
                }
            });
            const savedFlight = await this.prisma.flight.upsert({
                where: { id: flight.id },
                update: {
                    status: 'ON_TIME'
                },
                create: {
                    id: flight.id,
                    flightNumber: flight.flightNumber,
                    airline: flight.airline,
                    aircraft: flight.aircraft,
                    flightClass: flight.flightClass,
                    duration: this.parseDurationToMinutes(flight.duration),
                    price: BigInt(flight.price),
                    taxes: BigInt(flight.taxes || 0),
                    availableSeats: flight.availableSeats,
                    totalCapacity: flight.totalCapacity || 150,
                    airlineId: undefined,
                    aircraftId: undefined,
                    flightClassId: undefined,
                    departureAirportId: departureAirport.id,
                    arrivalAirportId: arrivalAirport.id,
                    departureTime: new Date(flight.departure.dateTime),
                    arrivalTime: new Date(flight.arrival.dateTime),
                    status: 'ON_TIME',
                    source: 'charter118'
                }
            });
            console.log('✅ Charter118 flight saved successfully:', savedFlight.id);
            return {
                success: true,
                data: savedFlight,
                message: 'Charter118 flight saved successfully'
            };
        }
        catch (error) {
            console.error('❌ Error saving Charter118 flight:', error);
            return {
                success: false,
                error: error.message,
                message: 'Failed to save Charter118 flight'
            };
        }
    }
    parseDurationToMinutes(duration) {
        const match = duration.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
            const hours = parseInt(match[1]);
            const minutes = match[2] ? parseInt(match[2]) : 0;
            return hours * 60 + minutes;
        }
        return 210;
    }
};
exports.FlightsService = FlightsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FlightsService.prototype, "autoCancelPastFlights", null);
exports.FlightsService = FlightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlightsService);
//# sourceMappingURL=flights.service.js.map