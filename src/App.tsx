import React, {lazy, Suspense} from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import {withRouter} from "react-router";
import AuthRoute from "./auth";
import {Header, Toast} from './components';

const Login = withRouter(
    lazy(() => import('./login'))
);

const ListPost = withRouter(
    lazy(() => import('./list_post'))
);

const CreatePost = withRouter(
    lazy(() => import('./form_post'))
);

const UpdatePost = withRouter(
    lazy(() => import('./form_post'))
);


const App = () => {
    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <AuthRoute>
                            <Header/>
                            <Route path="/posts" component={ListPost}/>
                            <Route path="/post/create" component={CreatePost}/>
                            <Route path="/post/update/:postId" component={CreatePost}/>
                        </AuthRoute>
                    </Switch>
                </Suspense>
                <Toast/>
            </Router>

        </>
    );
};

export default App;
