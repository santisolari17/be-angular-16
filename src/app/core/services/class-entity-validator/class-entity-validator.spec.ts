import { IsString, IsNumber, ValidateNested, IsDate } from 'class-validator';
import { CLASS_ENTITY_VALIDATOR_PROVIDER, CLASS_ENTITY_VALIDATOR_TOKEN } from './class-entity-validator.provider';
import { TestBed } from '@angular/core/testing';
import { IClassEntityValidator } from '@core/interfaces';

class TestClassValidatorEntity {
	@IsString()
	property1: string;

	@IsNumber()
	property2: number;

	constructor(params: { mustBeString: any; mustBeNumber: any }) {
		this.property1 = params.mustBeString;
		this.property2 = params.mustBeNumber;
	}
}

class NestedType {
	@IsDate()
	date: Date;

	constructor(date: any) {
		this.date = date;
	}
}

class TestNestedClassValidatorEntity {
	@IsString()
	property1: string;

	@IsNumber()
	property2: number;

	@ValidateNested()
	nestedProperty: NestedType;

	constructor(params: { mustBeString: any; mustBeNumber: any; mustBeNestedType: any }) {
		this.property1 = params.mustBeString;
		this.property2 = params.mustBeNumber;
		this.nestedProperty = params.mustBeNestedType;
	}
}

describe('[Core service] class-entity-validator', () => {
	let service: IClassEntityValidator;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CLASS_ENTITY_VALIDATOR_PROVIDER],
		});

		service = TestBed.inject(CLASS_ENTITY_VALIDATOR_TOKEN);

		jest.resetAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('Should log a warning if the entity is not valid', async () => {
		const consoleWarnSpy = jest.spyOn(console, 'warn');

		const mockInstance = new TestClassValidatorEntity({
			mustBeString: 123,
			mustBeNumber: 'helloworld',
		});
		const expectedWarnLogs = [
			`[BACKEND_PROPERTY_VALUE_MISMATCH] Entity of type "TestClassValidatorEntity" is not a valid entity of that type.`,
			`resource: [TestClassValidatorEntity] - code: [property1_isString] message: [property1 must be a string] [provided value: 123]]`,
			`resource: [TestClassValidatorEntity] - code: [property2_isNumber] message: [property2 must be a number conforming to the specified constraints] [provided value: helloworld]]`,
		];

		await service.validate(mockInstance);

		expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, expectedWarnLogs[0]);
		expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, expectedWarnLogs[1]);
		expect(consoleWarnSpy).toHaveBeenNthCalledWith(3, expectedWarnLogs[2]);

		jest.resetAllMocks();
	});

	it('Should log a warning if a nested entity property is not valid', async () => {
		const consoleWarnSpy = jest.spyOn(console, 'warn');

		const mockInstance = new TestNestedClassValidatorEntity({
			mustBeString: 'helloworld',
			mustBeNumber: 123,
			mustBeNestedType: new NestedType('invalidNestedType'),
		});
		const expectedWarnLogs = [
			`[BACKEND_PROPERTY_VALUE_MISMATCH] Entity of type "TestNestedClassValidatorEntity" is not a valid entity of that type.`,
			`resource: [TestNestedClassValidatorEntity] - code: [nestedProperty_date_isDate] message: [date must be a Date instance] [provided value: invalidNestedType]]`,
		];

		await service.validate(mockInstance);

		expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, expectedWarnLogs[0]);
		expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, expectedWarnLogs[1]);

		jest.resetAllMocks();
	});
});
