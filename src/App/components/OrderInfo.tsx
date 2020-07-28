import { FakePostOrderResponseBody } from '../../utils/fakeServer';
import React from 'react';
type Props = {
	order: FakePostOrderResponseBody
};
const OrderInfo: React.FC<Props> = (props: Props) => <div>
	<h2>{'Ваша машина в пути'}</h2>
	<p>{`Номер заказа: ${props.order.data.order_id}` }</p>
</div>;

export default OrderInfo;
