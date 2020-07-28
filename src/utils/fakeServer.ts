/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import distance from '@turf/distance';
const getDate = (): string => {
	const year = new Date().getFullYear();
	const month = new Date().getMonth();
	const days = new Date().getDay();
	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();
	const seconds = new Date().getSeconds();
	return `${year}${month}${days}${hours}${minutes}${seconds}`;
};
export interface FakePostRequestBody {
	source_time: string // формат времени ГГГГММДДччммсс
	addresses:[
		{
			address: string
			lat: number
			lon: number
		}
	]
}
export interface FakePostOrderRequest extends FakePostRequestBody {
	crew_id: number
}
export type Crew = {
	crew_id: number
	car_mark: string
	car_model: string
	car_color: string
	car_number: string
	driver_name: string
	driver_phone: string
	lat: number
	lon: number
	distance: number
};
export interface FakePostResponseBody {
	code: number
	descr: string
	data: {
		crews_info: Crew[]
	}
}
export interface FakePostOrderResponseBody {
	code: number
	descr: string
	data: {
		order_id: number
	}
}
export const createRequestBody = (option: GeoJSON.Feature): FakePostRequestBody => {
	if (option.properties && option.properties['formatted'] && option.geometry.type === 'Point') {
		const [lng, lat] = option.geometry.coordinates;
		return {
			source_time: getDate(),
			addresses: [
				{
					address: option.properties['formatted'] as string,
					lat,
					lon: lng,
				},
			],
		};
	}
	throw Error('No body');
};
export const createOrderRequestBody = (option: GeoJSON.Feature, crew: Crew): FakePostOrderRequest => {
	if (option.properties && option.properties['formatted'] && option.geometry.type === 'Point') {
		const [lng, lat] = option.geometry.coordinates;
		return {
			source_time: getDate(),
			addresses: [
				{
					address: option.properties['formatted'] as string,
					lat,
					lon: lng,
				},
			],
			crew_id: crew.crew_id,
		};
	}
	throw Error('No body');
};
const responseOrderMock = (orderInfo: FakePostOrderRequest): FakePostOrderResponseBody => ({
	code: 0,
	descr: 'OK',
	data: {
		order_id: Math.floor(Math.random() * (1001 - 1) + 1),
	},
});
const responseMock = (target: FakePostRequestBody): FakePostResponseBody => ({
	code: 0,
	descr: 'OK',
	data: {
		crews_info: [
			{
				crew_id: 123,
				car_mark: 'Chevrolet',
				car_model: 'Lacetti',
				car_color: 'синий',
				car_number: 'Е234КУ',
				driver_name: 'Деточкин',
				driver_phone: '7788',
				lat: 56.872374,
				lon: 53.211187,
				distance: Math.round(distance([target.addresses[0].lon, target.addresses[0].lat], [53.211187, 56.872374], { units: 'meters' })),
			},
			{
				crew_id: 125,
				car_mark: 'Hyundai',
				car_model: 'Solaris',
				car_color: 'белый',
				car_number: 'Ф567АС',
				driver_name: 'Петров',
				driver_phone: '8899',
				lat: 56.860581,
				lon: 53.209223,
				distance: Math.round(distance([target.addresses[0].lon, target.addresses[0].lat], [53.209223, 56.860581], { units: 'meters' })),
			},
			{
				crew_id: 126,
				car_mark: 'Chevrolet',
				car_model: 'Lacetti',
				car_color: 'красный',
				car_number: 'А256УУ',
				driver_name: 'Иванов',
				driver_phone: '8888',
				lat: 56.852447,
				lon: 53.291776,
				distance: Math.round(distance([target.addresses[0].lon, target.addresses[0].lat], [53.291776, 56.852447], { units: 'meters' })),
			},

		].sort((a, b) => a.distance - b.distance),

	},

});
const delay = 50;
export const fakePost = (postBody: FakePostRequestBody): Promise<FakePostResponseBody> => new Promise(res => setTimeout(() => res(responseMock(postBody)), delay));
export const fakePostOrder = (postBody: FakePostOrderRequest): Promise<FakePostOrderResponseBody> => new Promise(res => setTimeout(() => res(responseOrderMock(postBody)), delay));
