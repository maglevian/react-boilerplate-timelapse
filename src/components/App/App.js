import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Content from '../Content/Content';
import './App.css';

const title = 'Hello World';

class App extends React.Component {
    render() {
        return (
            <div className="main-app">
                <header className="main-header">
                    <h1>{title}</h1>
                </header>
                <main className="main-content">
                    <Content/>
                </main>
                <footer className="main-footer">
                    <small className="text-muted">
                    Footer Text
                    </small>
                </footer>
            </div>
        );
    }
};
export default App; 