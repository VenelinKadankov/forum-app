import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export const TopicCard = ({ topic }) => {
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Img src={topic.image}></Card.Img>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>
                    {topic.description}
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <Link to={`/topics/${topic.id}/themes`}>View themes in topic</Link>
            </Card.Body>
        </Card>
    );
}