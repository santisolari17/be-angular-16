export interface IClassEntityValidator {
  validate(classInstance: any): Promise<void>;
}
