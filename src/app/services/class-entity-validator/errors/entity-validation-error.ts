export type TValidationErrorDefinition = {
	resource: string;
	code: string;
	message: string;
};

export class EntityValidationError extends Error {
	public readonly validationErrorsString: string[] = [];

	constructor(
		public errors: TValidationErrorDefinition[],
		public validationMessage?: string
	) {
		super(validationMessage ? validationMessage : 'Service call did not pass one or many validations');

		errors.forEach(e => console.error(this._makeErrorString(e)));
		errors.forEach(e => this.validationErrorsString.push(this._makeErrorString(e)));
	}

	private _makeErrorString(errors: TValidationErrorDefinition): string {
		return `resource: [${errors.resource}] - code: [${errors.code}] message: [${errors.message}]`;
	}
}
