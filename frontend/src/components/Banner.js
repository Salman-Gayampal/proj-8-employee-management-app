import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';

import { FaUserPlus } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { useContext } from 'react';

export default function Banner({ data }) {

	const { user } = useContext(UserContext)
	// console.log(data)
	const { title, content, destination, label } = data;

	return (
		<Row>
			<Col className="p-5 home">
				<h1>{title}</h1>

				<p>{content}</p>

				{
					(user.id !== null) ?
						<>
							<Button id="buildButton" variant="dark" as={Link} to={destination}>
								<FaUserPlus />
								{label}
							</Button>
						</>
						:
						<>
							<Button id="buildButton" variant="dark" as={Link} to={destination}>
								<RiLoginCircleFill />
								{label}
							</Button>
						</>
				}

			</Col>
		</Row>
	)
};