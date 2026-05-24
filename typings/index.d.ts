declare module '@wordpress/core-data' {
	function useEntityId( kind: string, name: unknown, id?: string ): any;
	function useEntityProp< T = unknown >(
		kind: string,
		name: string,
		prop: string,
		id?: string
	): [ T, ( value: T ) => void, T ];
	function useEntityRecord< T = unknown >(
		kind: string,
		name: string,
		id: number | string,
		options?: { enabled: boolean }
	): {
		record: T;
		editedRecord: T;
		isResolving: boolean;
		hasResolved: boolean;
	};
	const store: string;
}