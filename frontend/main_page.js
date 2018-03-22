'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import PEOPLE from '/home/data/people.yaml';

import 'normalize.css';

const onDomLoad = () => new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', resolve);
});

const PEOPLE_PREPARED = PEOPLE.map(person => ({
    ...person,
    birth: person.birth ? new Date(person.birth) : null,
    death: person.death ? new Date(person.death) : null,
}));


const get_month_part = d => [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];

const TODAY = new Date();


const years_diff = (start, end) => {
    if (typeof start === "string") {
        start = new Date(start);
    }
    let diff = (get_month_part(end) < get_month_part(start)) ? 0 : 1;
    return end.getFullYear() - start.getFullYear() - diff;
};

const format_date = date => `${('' + date.getDate()).padStart(2, '0')}.${('' + (date.getMonth()+1)).padStart(2, '0')}.${date.getFullYear()}`;


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
        {PEOPLE_PREPARED.map(person => (
            <li key={person.id}>
                {person.last_name} {person.first_name} {person.middle_name}
                {' '}<span title={`${format_date(person.birth)}${!person.death ? '' : ' - '+format_date(person.death)}`}>
                    ({years_diff(person.birth, person.death || TODAY)})
                </span>
            </li>
        ))}
    </ul>
);
