export default <T>(urlApi: string): Promise<T> => fetch(urlApi)
	.then(response => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json() as Promise<T>;
	});
