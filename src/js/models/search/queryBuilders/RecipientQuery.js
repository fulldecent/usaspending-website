/**
 * Created by michaelbray on 2/17/17.
 */

import _ from 'lodash';

const recipientIdField = 'recipient__legal_entity_id';
const countryCodeField = 'recipient__location__location_country_code';
const locationIdField = 'recipient__location__location_id';

const buildRecipientQueryWithPrefix = (recipients, prefix) => {
    const recipientSet = [];

    // Push legal_entity_id's of selected recipients
    recipients.forEach((recipient) => {
        recipientSet.push(recipient.legal_entity_id);
    });

    const filter = {
        field: `${prefix}${recipientIdField}`,
        operation: "in",
        value: recipientSet
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

const buildRecipientLocationQueryWithPrefix = (locations, prefix) => {
    let locationSet = [];

    // Concatenate Matched IDs of selected locations
    // Duplicates do not matter in API query
    locations.forEach((location) => {
        locationSet = _.concat(locationSet, location.matched_ids);
    });

    const filter = {
        field: `${prefix}${locationIdField}`,
        operation: "in",
        value: locationSet
    };

    return filter;
};


export const buildRecipientQuery = (recipients) =>
    buildRecipientQueryWithPrefix(recipients, '');

export const buildFileCRecipientQuery = (recipients) =>
    buildRecipientQueryWithPrefix(recipients, 'award__');

export const buildDomesticForeignQuery = (selection) =>
    buildDomesticForeignQueryWithPrefix(selection, '');

export const buildFileCDomesticForeignQuery = (selection) =>
    buildDomesticForeignQueryWithPrefix(selection, 'award__');

export const buildRecipientLocationQuery = (locations) =>
    buildRecipientLocationQueryWithPrefix(locations, '');

export const buildFileCRecipientLocationQuery = (locations) =>
    buildRecipientLocationQueryWithPrefix(locations, 'award__');
