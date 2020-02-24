import React, {useEffect} from 'react';
import {TextAreaInput, TextInput} from "../components";
import classNames from "classnames";
import {useInput, useToast} from "../hooks";
import {useParams, useHistory} from "react-router";

interface IInput {
    title: string;
    content: string;
}

const FormPost: React.FC = () => {
    const [input, handleChangeInput, isDirty, resetInput, changeInput] = useInput<IInput>();
    const [showToast] = useToast();
    const history = useHistory();
    const {postId} = useParams();

    useEffect(() => {
        if (postId) {
            const fetchInfoPost = async () => {
                const response = await fetch(`http://localhost:8626/api/posts/info?postId=${postId}`, {
                    method: 'get',
                    headers: {'Content-Type': 'application/json'},
                });
                const responseJson = await response.json();
                if (responseJson.resultCode === 0) {
                    return showToast(responseJson.errorMessage, 'error')
                }
                changeInput({...responseJson.resultData});
            };
            fetchInfoPost();
        }
    }, []);

    const updatePost = async () => {
        if (input.title && input.content) {
            const response = await fetch('http://localhost:8626/api/posts/update', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input)
            });
            const responseJson = await response.json();
            if (responseJson.resultCode === 0) {
                return showToast(responseJson.errorMessage, 'error')
            }
            resetInput();
            history.push('/posts');
            return showToast('Update post successfully!', 'success')
        }
    };

    const publishPost = async () => {
        if (input.title && input.content) {
            const response = await fetch('http://localhost:8626/api/posts/create', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(input)
            });
            const responseJson = await response.json();
            if (responseJson.resultCode === 0) {
                return showToast(responseJson.errorMessage, 'error')
            }
            resetInput();
            history.push('/posts');
            return showToast('Publish new post successfully!', 'success')
        }
    };

    return (
        <>
            <div className="p-10 antialiased">
                <div>
                    <h3 className="text-xl font-bold hover:font-extrabold hover:text-purple-800 text-purple-700">
                        {postId ? 'Update post' : 'Publish post'}
                    </h3>
                </div>
                <div className="mt-10">
                    <div className="w-5/12 pl-4 pr-4">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100">
                            <TextInput
                                label={"Post title"}
                                name={"title"}
                                type={"text"}
                                placeHolder={"Post title"}
                                value={input.title}
                                onChange={handleChangeInput}
                                isDirty={isDirty.title}
                                textError={"Please enter post title."}/>
                            <TextAreaInput
                                label={"Post content"}
                                name={"content"}
                                placeHolder={"Type content for post"}
                                value={input.content}
                                onChange={handleChangeInput}
                                isDirty={isDirty.content}
                                textError={"Please enter post content."}
                                rows={8}
                                cols={30}/>
                            <div>
                                <button
                                    onClick={postId ? updatePost : publishPost}
                                    className={classNames(`bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none`, {
                                        'opacity-50 cursor-not-allowed': !input.title || !input.content,
                                        ' hover:bg-purple-700  focus:shadow-outline': input.title && input.content,
                                    })}
                                    type="button">
                                    {postId ? 'Update post' : 'Publish post'}
                                </button>

                                <button
                                    onClick={() => history.push('/posts')}
                                    className="bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
};

export default FormPost;

