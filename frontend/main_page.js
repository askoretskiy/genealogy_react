'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

const onDomLoad = () => new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', resolve);
});

onDomLoad().then(() => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(Application, div);
});

const Application = (
    <div>
        Hello world!
    </div>
);
