import './Crews.scss';
import React, { ReactElement } from 'react';
import { Crew } from '../../utils/fakeServer';

type Props = {
	crew: Crew
};

const SelectedCrew: React.FC<Props> = (props: Props): ReactElement => {
	const { crew_id: id, car_color: color, car_mark: mark, car_model: model, car_number: number } = props.crew;
	return <div className='selected-crew' key={id}>
		<img src="" alt="icon-car"/>
		<h2>{`${model} ${mark}`}</h2>
		<p>{color}</p>
		<p>{number}</p>
	</div>;
};
export default SelectedCrew;
