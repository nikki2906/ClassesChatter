import { useState } from 'react';
import { supabase } from '../client';

const createPost = () => {
    const[post, setPost] = useState({title: '', content: '', url: ''});

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.group("Name: : ", name, "value: ", value);
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();

        if(post.title != '') {
            await supabase
            .from('Posts')
            .insert({title: post.title, content: post.content, add_url: post.add_url})
            .select();

        window.location = "/";
        }
        else {
            alert('Please enter a title');
        }       
    }

    return (
        <div className="create_card">
            <form className="create_form">
                <h3 className="form_title">Create a Post</h3>
                
                <div className="form_item">
                    <label for="title">Title</label> <span className="form_tag">(Required)</span>
                    <input className="textbox" type="text" name="title" value={post.title} onChange={handleChange}  required />
                </div>

                <div className="form_item">
                    <label for="content">Content</label><br />
                    <textarea className="post_content_input" rows="5" cols="50" id="content" name="content" value={post.content} oncChange={handleChange}/>
                </div>

                <div className="form_item">
                    <label for="add_url">Add an URL</label><br />
                    <input className="textbox" type="text" id="add_url" name="add_url" value={post.add_url} onChange={handleChange} />
                </div>

                <button type="submit" onClick={createPost} className="create_edit_post_btn">Create Post</button>
            </form>
        </div>
    );
};

export default createPost;