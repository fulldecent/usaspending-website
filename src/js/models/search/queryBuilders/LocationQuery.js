/**
* LocationQuery.js
* Created by Emily Gullo
**/

import _ from 'lodash';

const locationIdField = 'place_of_performance__location_id';
const countryCodeField = 'place_of_performance__location_country_code';

const buildLocationQueryWithPrefix = (values, prefix) => {
    let valueSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    values.forEach((locArray) => {
        valueSet = _.concat(valueSet, locArray.matched_ids);
    });

    const filter = {
        field: `${prefix}${locationIdField}`,
        operation: "in",
        value: valueSet
    };

    return filter;
};

const buildDomesticForeignQueryWithPrefix = (selection, prefix) => {
    let op = 'equals';
    if (selection === 'foreign') {
        op = 'not_equals';
    }

    const filter = {
        field: `${prefix}${countryCodeField}`,
        operation: op,
        value: 'USA'
    };

    return filter;
};


export const buildLocationQuery = (values) =>
    buildLocationQueryWithPrefix(values, '');

export const buildFileCLocationQuery = (values) =>
    buildLocationQueryWithPrefix(values, 'award__');

export const buildDomesticForeignQuery = (selection) =>
    buildDomesticForeignQueryWithPrefix(selection, '');

export const buildFileCDomesticForeignQuery = (selection) =>
    buildDomesticForeignQueryWithPrefix(selection, 'award__');
