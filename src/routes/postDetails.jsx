import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const postDetails = () => {
    const {id} = useParams();   
    const [post, setPost] = useState({});
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("")
    const [randomPosts, setRandomPosts] = useState([]);
    const timeSincePost = moment.utc(post.created_at).local().startOf('seconds').fromNow();

    useEffect(() => {
        const getPost = async () => {
            // get the post associated with the id
            const {data, error} = await supabase
          .from('Posts')
          .select()
          .eq('id', id);
          setPost({id: data[0].id, created_at: data[0].created_at, post_title: data[0].post_title, post_content: data[0].post_content, add_url: data[0].add_url, 
            upvotes: data[0].upvotes});
        }

        const getComments = async () => {
            const {data, error} = await supabase
          .from('Comments')
          .select()
          .eq('post_id', id);

          setComments(data);
        }

        const getRandomPost = async () => {
            const {data, error} = await supabase
            .from("Posts")
            .select()
            .order('created_at', { ascending: true });

            let filteredPosts = data.filter(item => (item.id != id));
            let randomPosts = [];

            for(let i = 0; i < filteredPosts.length && i < 5; i++) {
                let randomPost = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
                while(randomPosts.includes(randomPost)) {
                    randomPost = filteredPosts[Math.floor(Math.random() * filteredPosts.length)];
                }
                randomPosts[i] = randomPost;
            }
            setRandomPosts(randomPosts);
        }
        getPost();
        getComments();
        getRandomPost();
    }, []);
    
    const increaseUpvotes = async () => {
        console.log("increase upvote ..");
        let updatedPost = {...post};
    updatedPost.upvotes = (updatedPost.upvotes || 0) + 1;
        
        event.preventDefault();

        // send updated data to the database
        await supabase
        .from('Posts')
        .update({upvotes: updatedPost.upvotes})
        .eq('id', post.id);

        console.log(updatedPost);
        setPost(updatedPost);
    }

    const deletePost = async (event) => {
        event.preventDefault();

        const response = confirm("Are you sure you want to delete this post?");

        if(response) {
            await supabase
            .from('Posts')
            .delete()
            .eq('id', post.id);

            window.location = "/";
        }
    }

    const postComment = async () => {
        event.preventDefault();

        await supabase
        .from('Comments')
        .insert({post_id: post.id, comment_text: newComment})

        // refresh the page
        window.location = "/postDetails/" + id;

    }

    const handleChange = (event, id) => {
        const {name, value} = event.target;
        console.log("Name: ", name, "Value: ", value);
        setNewComment(value);
    }

    let navigate = useNavigate();

    const moveToEditPost = (event, id) => {
        let path = "/editPost/" + id;  
        navigate(path);
    }

    const moveToNewPostDetails = (event, id) => {
        window.location = "/postDetails/" + id;
    }

    // Function to extract the class name from the URL and capitalize the first letter of each word
    const extractClassNameFromUrl = (url) => {
        let urlParts = url.split('/');
        let className = urlParts[urlParts.length - 1].replace(/-/g, ' ');
        return className.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const handleUrlClick = (event) => {
        event.stopPropagation(); // Prevent the click event from triggering the parent <Link> component's click event
    }


    return (
        <div className="post_details_page">
            <div className="post_details_main_content">
                <div className="post_details_card">

                    {/* Upvote Column */}
                    <div className="upvote_column">
                        <button className="upvote_button" onClick={increaseUpvotes}>
                            <img src="../src/assets/100_points.png" className="option_img" />
                        </button>
                        <h5 className="upvote_num">{post.upvotes}</h5>
                    </div>

                    {/* Render a post */}
                    <div className="post_details">
                        <h4 className="post_details_time">Created {timeSincePost}</h4> 
                        <p className="post_title">{post.post_title}</p>
                        <p className="post_subtext">{post.post_content}</p>

                       {/* if there is content in the post, it renders a paragraph element with the content of the post. If there is no content in the post, it renders nothing (null).*/}
                        {post.content ? (
                            <p>{post.content}</p>
                        ) : null} 

                        {/* if there is an URL in the post, it renders an image element with the image URL. If there is no image URL in the post, it renders nothing (null). */}
                        {post.add_url ? (
                            <div onClick={handleUrlClick} className='link-container'>
                                <h4>{extractClassNameFromUrl(post.add_url)}</h4> {/* Corrected from postData.add_url */}
                                <a href={post.add_url} target="_blank" rel="noopener noreferrer">{post.add_url}</a> {/* Corrected from postData.add_url */}
                            </div>
                        ) : null}

                    </div>

                    {/* Post option */}
                    <div className="post_options">
                        <button className="option_btn" onClick={(event) => moveToEditPost(event, post.id)}>
                            <img src="../src/assets/edit_icon.png" className="option_img" />
                        </button>
                        <button className="option_btn" onClick={deletePost}>
                            <img src="../src/assets/delete_icon.png" className="option_img" />
                        </button>
                    </div>
                    </div>
                    {/* Comment Section */}
                    <div className="comments_section">
                        <label for="comment" id="comment_label">Post a Comment</label><br />
                        {/* Textarea for the user to write a new comment */}
                        <textarea className="comment_input" rows="5" cols="50" id="newComment" name="newComment" value={newComment} onChange={handleChange} />
                        <button onClick={postComment}>Post Comment</button>

                        {/* If comments exist, display the number of comments. Otherwise, display "0 comments". */}
                        {comments != null ? (
                            <h4>{comments.length} comments</h4>
                        ) : (
                            <h4>0 comments</h4>
                        )}

                        {/* Render comments */}
                        <div className="comment_list">
                            {/* If comments exist and there's at least one, map through the comments and display each one. Otherwise, display a message encouraging the first comment. */}
                            {comments != null && comments.length > 0 ? (
                                comments.map((comment, index) =>
                                <div className="user_comment" key={index}>
                                    {/* Display the time when the comment was created, from now. */}
                                    <h6>{moment.utc(comment.created_at).local().startOf('seconds').fromNow()}</h6>
                                    {comment.comment_text} {/* Display the text of the comment. */}
                                </div>
                            )) : 
                                <p>No comments yet!</p>
                            }
                        </div>
                    </div>
                </div>

                <div className="post_details_suggested_posts">
                <h3>Suggested Posts</h3>
                {/* If randomPosts exist and there's at least one, map through the posts and display each one as a button. Otherwise, display a message saying "No suggested posts". */}
                {randomPosts != null && randomPosts.length > 0 ? (
                            randomPosts.map((post, index) =>
                            <button onClick={(event) => moveToNewPostDetails(event, post.id)} className="suggested_post" key={index}> {/* Button for each suggested post. When clicked, it triggers the moveToNewPostDetails function with the event object and the post's id as arguments. */}
                                <h5>{moment.utc(post.created_at).local().startOf('seconds').fromNow()}</h5> {/* Display the time when the post was created, from now. */}
                                <p className="suggested_post_title">{post.post_title}</p>
                            </button>
                        )) : <p>No suggested posts</p>
                        }
            </div>
        </div>
    );
};

export default postDetails;