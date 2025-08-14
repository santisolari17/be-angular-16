import { Injectable } from '@angular/core';
import { IFocusService, THTMLSelector } from '../../../interfaces/focus-service.interface';

@Injectable({
	providedIn: 'root',
})
export class FocusService implements IFocusService {
	private _elementNode: Element | null = document.querySelector('body');

	public setCurrentHTMLelementNode(elementNode: Element | null): void {
		this._elementNode = elementNode;
	}

	public focusFirstSelector(selector: THTMLSelector, delay?: number): void {
		if (!this._elementNode) {
			return this._logNoElementSelectedWarning();
		}

		const element = this._elementNode.querySelector(selector) as HTMLElement;
		if (!element) {
			console.warn(`[Focus Service] Selector element [${selector}] could not be selected/found`);
			return;
		}

		this._focusElement(element, delay);
	}

	public focusId(id: string, delay?: number): void {
		if (!this._elementNode) {
			return this._logNoElementSelectedWarning();
		}

		const element = this._elementNode.querySelector(`#${id}`) as HTMLElement;
		if (!element) {
			console.warn(`[Focus Service] Element of id [${id}] could not be selected/found`);
			return;
		}

		return this._focusElement(element, delay);
	}

	public focusFirstClass(classname: string, delay?: number): void {
		if (!this._elementNode) {
			return this._logNoElementSelectedWarning();
		}

		const element = this._elementNode.querySelector(`.${classname}`) as HTMLElement;
		if (!element) {
			console.warn(`[Focus Service] Element of class [${classname}] could not be selected/found`);
			return;
		}

		this._focusElement(element, delay);
	}

	private _focusElement(element: HTMLElement, delay?: number): void {
		if (!delay) {
			element.focus();
			element.style.outline = 'none';
			return;
		}

		setTimeout(() => {
			element.focus();
			element.style.outline = 'none';
		}, delay);
	}

	private _logNoElementSelectedWarning(): void {
		console.warn(`[Focus Service] Main element node has a null value. Please set an element node using "setCurrentHTMLelementNode()"`);
	}
}
