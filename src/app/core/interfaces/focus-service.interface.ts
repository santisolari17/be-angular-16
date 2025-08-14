export type THTMLSelector =
	| 'div'
	| 'span'
	| 'ul'
	| 'li'
	| 'section'
	| 'header'
	| 'footer'
	| 'main'
	| 'article'
	| 'nav'
	| 'p'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'a'
	| 'button'
	| 'banner';

export interface IFocusService {
	setCurrentHTMLelementNode(elementNode: Element | null): void;
	focusFirstSelector(selector: THTMLSelector, delay?: number): void;
	focusFirstClass(classname: string, delay?: number): void;
	focusId(id: string, delay?: number): void;
}
