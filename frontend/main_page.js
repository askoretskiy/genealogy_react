'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import PEOPLE from '/home/data/people.yaml';

import 'normalize.css';

const onDomLoad = () => new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', resolve);
});


const get_month_part = d => [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];


const get_age = date => {
    const today = new Date();
    if (typeof date === "string") {
        date = new Date(date);
    }
    let diff = (get_month_part(today) < get_month_part(date)) ? 0 : 1;
    return today.getFullYear() - date.getFullYear() - diff;
};


onDomLoad().then(() => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render((
        <Application/>
    ), div);
});


const Application = () => [
    <h1 key={1}>Genealogy</h1>,
    <People key={2}/>,
];

const People = () => (
    <ul>
        {PEOPLE.map(person => (
            <li key={person.id}>
                {person.last_name} {person.first_name} {person.middle_name} ({get_age(person.birth)})
            </li>
        ))}
    </ul>
);
