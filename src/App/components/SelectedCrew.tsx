import './SelectedCrew.scss';
import React, { ReactElement } from 'react';
import { Crew } from '../../utils/fakeServer';

type Props = {
	crew: Crew
};

const SelectedCrew: React.FC<Props> = (props: Props): ReactElement => {
	const { crew_id: id, car_color: color, car_mark: mark, car_model: model, car_number: number } = props.crew;
	return <div className='order__selected-crew'>
		<h2>{'Подходящий экипаж:'}</h2>
		<div className='order__selected-crew-data' key={id}>
			<div>
				<img src="./icons/icon_car.svg" alt="icon-car" className='order__selected-crew-image'/>
			</div>
			<div className='order__selected-crew-info'>
				<h2>{`${model} ${mark}`}</h2>
				<p>{color}</p>
				<strong>{number}</strong>
			</div>
		</div>
	</div>;
};
export default SelectedCrew;
