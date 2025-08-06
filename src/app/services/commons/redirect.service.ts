import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ParentInteractorService } from 'beche-utils-lib';

@Injectable({
	providedIn: 'root',
})
export class RedirectService {
	private _parentInteractorService: ParentInteractorService = inject(ParentInteractorService);

	public redirect_NameFuncionality(numeroCuenta: string): void {
		const url_NameFuncionality = '/apps/urlFuncionality';
		const urlNew = `${location.origin}${url_NameFuncionality}`;
		const uidMenu = '64149e6aeaf463cbc742a1de';
		this._parentInteractorService.redirectUrlDataEncrypt(
			uidMenu,
			urlNew,
			{ accountNumber: numeroCuenta },
			{ etapa: 'EJ0000', funcionalidad: 'EJ0000' },
			environment.hostRsaService
		);
	}
}
