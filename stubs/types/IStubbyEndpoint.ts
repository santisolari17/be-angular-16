type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type HttpStatusCode =
	// 2xx Success
	| 200 // OK
	| 201 // Created
	| 202 // Accepted
	| 204 // No Content

	// 3xx Redirection
	| 301 // Moved Permanently
	| 302 // Found
	| 304 // Not Modified
	| 307 // Temporary Redirect
	| 308 // Permanent Redirect

	// 4xx Client Errors
	| 400 // Bad Request
	| 401 // Unauthorized
	| 403 // Forbidden
	| 404 // Not Found
	| 405 // Method Not Allowed
	| 409 // Conflict
	| 422 // Unprocessable Entity
	| 429 // Too Many Requests

	// 5xx Server Errors
	| 500 // Internal Server Error
	| 501 // Not Implemented
	| 502 // Bad Gateway
	| 503 // Service Unavailable
	| 504; // Gateway Timeout;

export interface IStubbyEndpoint<TRequestBody = unknown, TResponseBody = unknown> {
	request: {
		method: HttpMethod;
		url: string;
		query?: Record<string, string>;
		headers?: Record<string, string>;
		body?: TRequestBody;
	};
	response: {
		status: HttpStatusCode;
		latency: number;
		headers?: Record<string, string>;
		body?: TResponseBody;
	};
}
