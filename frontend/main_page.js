'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import PEOPLE from '/home/data/people.yaml';

import 'normalize.css';

const TODAY = new Date();

const onDomLoad = () => new Promise((resolve, reject) => {
    document.addEventListener('DOMContentLoaded', resolve);
});

const PEOPLE_PREPARED = PEOPLE.map(person => ({
    ...person,
    birth: person.birth ? new Date(person.birth) : null,
    death: person.death ? new Date(person.death) : null,
    children: [],
}));

const PEOPLE_INDEX = new Map(PEOPLE_PREPARED.map(person => [person.id, person]));

for (let person of PEOPLE_INDEX.values()) {
    person.parents = person.parents.filter(id => id !== null).map(id => PEOPLE_INDEX.get(id));
    for (let parent of person.parents) {
        parent.children.push(person);
    }
}

const PEOPLE_TOP = [...PEOPLE_INDEX.values()].filter(person => !person.parents.length);

const get_month_part = d => [d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];

const compare_months = (start, end) => {
    const start_month = get_month_part(start);
    const end_month = get_month_part(end);
    for (let i = 0; i < start_month.length; i++) {
        if (end_month[i] < start_month[i]) {
            return false;
        }
    }
    return true;
};

const years_diff = (start, end) => end.getFullYear() - start.getFullYear() - (compare_months(start, end) ? 0 : 1);

const format_date = date => `${('' + date.getDate()).padStart(2, '0')}.${('' + (date.getMonth() + 1)).padStart(2, '0')}.${date.getFullYear()}`;


onDomLoad().then(() => {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render((
        <Application/>
    ), div);
});


const Application = () => [
    <h1 key={1}>Genealogy</h1>,
    <People key={2} people={PEOPLE_TOP}/>,
];

const People = ({people}) => (
    <ul>
        {people.map(person => (
            <li key={person.id}>
                {person.last_name} {person.first_name} {person.middle_name}
                {' '}
                <span title={`${format_date(person.birth)}${!person.death ? '' : ' - ' + format_date(person.death)}`}>
                    ({years_diff(person.birth, person.death || TODAY)})
                </span>
                {!person.children.length ? null : (
                    <People people={person.children}/>
                )}
            </li>
        ))}
    </ul>
);
