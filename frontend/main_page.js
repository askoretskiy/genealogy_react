'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

const onDomLoad = () => new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', resolve);
});

onDomLoad().then(() => ReactDOM.render(Application, document.getElementById('root')));

const Application = (
    <div>
        Hello world!
    </div>
);
