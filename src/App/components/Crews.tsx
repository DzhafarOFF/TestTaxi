import './Crews.scss';
import React, { ReactElement, useCallback } from 'react';
import { Crew } from '../../utils/fakeServer';
import { selectCrew } from '../../actions/selectCrew';
import { useDispatch } from 'react-redux';

type Props = {
	crews: Crew[]
};

const Crews: React.FC<Props> = (props: Props): ReactElement => {
	const dispatch = useDispatch();
	const handleClick = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
		const id = Number(e.currentTarget.dataset.id);
		dispatch(selectCrew(props.crews[id]));
	},[dispatch, props.crews]);
	return <ul className='crews'>
		{
			props.crews.map((value, index) => {
				const { crew_id: id, car_color: color, car_mark: mark, car_model: model, distance } = value;

				return <li className='crews__item' key={id} data-id={index} onClick={handleClick}>
					<img src="" alt="icon-car"/>
					<h2>{`${model} ${mark}`}</h2>
					<p>{color}</p>
					<p>{`${distance} м`}</p>
				</li>;
			})
		}
	</ul>;
};
export default Crews;
