import React, { useState } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { AppDispatch } from "../../app/store"
import { selectAllUsers } from "../users/usersSlice";
import { User } from "../users/User"

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [showUsername, setShowUsername] = useState("")
    const [showEmail, setShowEmail] = useState("")
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectAllUsers);
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
        setTitle((e.target as HTMLInputElement).value);
    const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) =>
        setContent((e.target as HTMLInputElement).value);
    const onAuthorChanged = (e: React.FormEvent<HTMLSelectElement>) =>
        setUserId((e.target as HTMLInputElement).value);

    // const canSave =
    //     [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    // const onSavePostClicked = async () => {
    //     if (canSave) {
    //         try {
    //             setAddRequestStatus("pending");
    //             await dispatch(
    //                 addNewPost({ title, content, user: userId })
    //             ).unwrap();
    //             setTitle("");
    //             setContent("");
    //             setUserId("");
    //         } catch (err) {
    //             console.error("Failed to create project: ", err);
    //         } finally {
    //             setAddRequestStatus("idle");
    //         }
    //     }
    // };
    // Assuming you have a form element with an id of "myForm"
    const form = document.getElementById('myForm') as HTMLFormElement;

    const usersOptions = users.map((user: User) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //  event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the form data
        const formData = new FormData(form);

        // Access the form fields by their names
        const username = formData.get('postTitle');
        const email = formData.get('postContent');
        // ... access other form fields as needed
        setShowUsername(username as string);
        setShowEmail(email as string);
        // Do something with the form data
        console.log(username);
        console.log(email);
        // ... process the form data further
    };

    const deleteFormData = () => {
        setShowUsername("" as string);
        setShowEmail("" as string);
    };


    return (
        <section className="add-new-post">
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit} className="post-excerpt form-container" id="myForm">
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    className="form-input"
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" className="dropdown" value={userId} onChange={onAuthorChanged}>
                    <option value="">Electric</option>
                    <option value="">Girl</option>
                    <option value="">Man</option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className="form-input"
                />
                <button
                    type="submit"
                    // onClick={onSavePostClicked}
                    // disabled={canSave}
                    className="button muted-button"
                >
                    Save Post
                </button>
            </form>
            <div>
                <p>Post Title: {showUsername}</p>
                <p>Post Content: {showEmail}</p>
            </div>
            <button onClick={deleteFormData} className="button muted-button">Delete Form Data</button>
        </section>
    );

};

