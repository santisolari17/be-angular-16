import { IsString, IsNumber, ValidateNested, IsDate } from 'class-validator';
import { ClassEntityValidatorService } from './class-entity-validator.service';

describe('ClassEntityValidator implementation test suite (ClassEntityValidatorService)', () => {
	const entityValidator = new ClassEntityValidatorService();

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

		await entityValidator.validate(mockInstance);

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

		await entityValidator.validate(mockInstance);

		expect(consoleWarnSpy).toHaveBeenNthCalledWith(1, expectedWarnLogs[0]);
		expect(consoleWarnSpy).toHaveBeenNthCalledWith(2, expectedWarnLogs[1]);

		jest.resetAllMocks();
	});
});
