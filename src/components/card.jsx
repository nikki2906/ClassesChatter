import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = ({postData, updateUpvotes}) => {
    const increaseUpvotes = () => {
        updateUpvotes(postData);
    }

    const timeSincePost = moment.utc(postData.created_at).local().startOf('seconds').fromNow();

    const handleUrlClick = (event) => {
        event.stopPropagation(); // Prevent the click event from triggering the parent <Link> component's click event
    }

    // Function to extract the class name from the URL and capitalize the first letter of each word
    const extractClassNameFromUrl = (url) => {
        let urlParts = url.split('/');
        let className = urlParts[urlParts.length - 1].replace(/-/g, ' ');
        return className.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <div className='post'>
            <div className='upvote_column'>
                <button onClick={increaseUpvotes} className='upvote_button'>
                    <img src='src/assets/100_points.png' className='upvote_img' />
                </button>
                <h5 className='upvote_num'>{postData.upvotes}</h5>
            </div>
            <Link to={'/postDetails/'+postData.id}>
                <div className='post_data'>
                    <h4>Created {timeSincePost}</h4>
                    <p className='post_title'>{postData.post_title}</p>
    
                    {/* Display the post content as a subtext */}
                    <p className='post_content'>{postData.post_content}</p>
    
                    {/* Display the add_url as a clickable link */}
                    {postData.add_url && 
                        <div onClick={handleUrlClick} className='link-container'>
                            <h4>{extractClassNameFromUrl(postData.add_url)}</h4>
                            <a href={postData.add_url} target="_blank" rel="noopener noreferrer">{postData.add_url}</a>
                        </div>
                    }
                </div>
            </Link>
        </div>
    )
    
}

export default Card;
