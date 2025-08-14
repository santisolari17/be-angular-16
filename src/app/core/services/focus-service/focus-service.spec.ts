import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFocusService } from '@core/interfaces';
import { FOCUS_SERVICE_PROVIDER, FOCUS_SERVICE_TOKEN } from './focus-service.provider';

@Component({
	template: `
		<body>
			<div class="page-container">
				<h1 class="first-h1">Title element</h1>
				<p class="mock-text" id="first-mock-text">some text 1</p>
				<h2 class="first-h2">Sub title element</h2>
				<p class="mock-text">some text 2</p>
				<p class="mock-text">some text 3</p>
				<div class="mock-class">mock class element</div>
				<div id="mock-id">mock id element</div>
				<h2 class="second-h2">Another subtitle</h2>
			</div>
			<div class="other-section">
				<h1 class="second-h1">Other section title</h1>
			</div>
		</body>
	`,
})
class TestComponent {}

describe('FocusService', () => {
	let service: IFocusService;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent],
			providers: [FOCUS_SERVICE_PROVIDER],
		});

		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		service = TestBed.inject(FOCUS_SERVICE_TOKEN);

		jest.resetAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set the body of the html template as the default selected element', () => {
		expect(service['_elementNode']).toEqual(document.querySelector('body'));
	});

	it('should set a provided html element as the current selected element', () => {
		const newElement = document.querySelector('.page-container');
		service.setCurrentHTMLelementNode(newElement);

		expect(service['_elementNode']).toEqual(newElement);
	});

	describe('focusFirstSelector', () => {
		it('should focus the first selector of the selector type provided', () => {
			const focusMock = jest.fn();
			const firstH1Selector = document.querySelector('.first-h1') as HTMLElement;
			firstH1Selector.focus = focusMock;

			service.focusFirstSelector('h1');

			expect(focusMock).toHaveBeenCalled();
		});

		it('should focus the first selector of the selector type provided with delay', () => {
			jest.useFakeTimers();

			const delayMs = 200;
			const focusMock = jest.fn();
			const firstH1Selector = document.querySelector('.first-h1') as HTMLElement;
			firstH1Selector.focus = focusMock;

			service.focusFirstSelector('h1', delayMs);

			expect(focusMock).not.toHaveBeenCalled();

			jest.advanceTimersByTime(delayMs);
			expect(focusMock).toHaveBeenCalled();

			jest.useRealTimers();
		});

		it('should log a warning if the current element node is null or undefined', () => {
			const warnSpy = jest.spyOn(console, 'warn');

			service.setCurrentHTMLelementNode(null);
			service.focusFirstSelector('h1');

			expect(warnSpy).toHaveBeenCalledWith(
				`[Focus Service] Main element node has a null value. Please set an element node using "setCurrentHTMLelementNode()"`
			);
		});

		it('should log a warning if the provided selector is not found in the current element node', () => {
			const warnSpy = jest.spyOn(console, 'warn');
			const selector = 'banner';

			service.focusFirstSelector(selector);

			expect(warnSpy).toHaveBeenCalledWith(`[Focus Service] Selector element [${selector}] could not be selected/found`);
		});
	});

	describe('focusId', () => {
		it('should focus the element with the id provided', () => {
			const mockId = 'mock-id';
			const focusMock = jest.fn();
			const idElement = document.querySelector(`#${mockId}`) as HTMLElement;
			idElement.focus = focusMock;

			service.focusId(mockId);

			expect(focusMock).toHaveBeenCalled();
		});

		it('should focus the element with the id provided with delay', () => {
			jest.useFakeTimers();

			const delayMs = 200;
			const mockId = 'mock-id';
			const focusMock = jest.fn();
			const idElement = document.querySelector(`#${mockId}`) as HTMLElement;
			idElement.focus = focusMock;

			service.focusId(mockId, delayMs);

			expect(focusMock).not.toHaveBeenCalled();

			jest.advanceTimersByTime(delayMs);
			expect(focusMock).toHaveBeenCalled();

			jest.useRealTimers();
		});

		it('should log a warning if the current element node is null or undefined', () => {
			const warnSpy = jest.spyOn(console, 'warn');

			service.setCurrentHTMLelementNode(null);
			service.focusId('mock-id');

			expect(warnSpy).toHaveBeenCalledWith(
				`[Focus Service] Main element node has a null value. Please set an element node using "setCurrentHTMLelementNode()"`
			);
		});

		it('should log a warning if the provided id is not found in the current element node', () => {
			const warnSpy = jest.spyOn(console, 'warn');
			const mockId = 'mock-nonexistent-id';

			service.focusId(mockId);

			expect(warnSpy).toHaveBeenCalledWith(`[Focus Service] Element of id [${mockId}] could not be selected/found`);
		});
	});

	describe('focusFirstClass', () => {
		it('should focus the first class element on the current node of the class provided', () => {
			const mockClassFirstElementId = 'first-mock-text';
			const focusMock = jest.fn();
			const firstH1Selector = document.querySelector(`#${mockClassFirstElementId}`) as HTMLElement;
			firstH1Selector.focus = focusMock;

			service.focusFirstClass('mock-text');

			expect(focusMock).toHaveBeenCalled();
		});

		it('should focus the first selector of the selector type provided with delay', () => {
			jest.useFakeTimers();

			const delayMs = 200;
			const mockClassFirstElementId = 'first-mock-text';
			const focusMock = jest.fn();
			const firstH1Selector = document.querySelector(`#${mockClassFirstElementId}`) as HTMLElement;
			firstH1Selector.focus = focusMock;

			service.focusFirstClass('mock-text', delayMs);

			expect(focusMock).not.toHaveBeenCalled();

			jest.advanceTimersByTime(delayMs);
			expect(focusMock).toHaveBeenCalled();

			jest.useRealTimers();
		});

		it('should log a warning if the current element node is null or undefined', () => {
			const warnSpy = jest.spyOn(console, 'warn');

			service.setCurrentHTMLelementNode(null);
			service.focusFirstClass('mock-text');

			expect(warnSpy).toHaveBeenCalledWith(
				`[Focus Service] Main element node has a null value. Please set an element node using "setCurrentHTMLelementNode()"`
			);
		});

		it('should log a warning if the provided class is not found in the current element node', () => {
			const warnSpy = jest.spyOn(console, 'warn');
			const nonExistentClass = 'non-existent-class';

			service.focusFirstClass(nonExistentClass);

			expect(warnSpy).toHaveBeenCalledWith(`[Focus Service] Element of class [${nonExistentClass}] could not be selected/found`);
		});
	});
});
