export type TValidationErrorDefinition = {
	resource: string;
	code: string;
	message: string;
};

export interface IClassEntityValidator {
	validate(classValidatorEntity: object): Promise<void>;
}
