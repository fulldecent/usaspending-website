/**
* AgencyQuery.js
* Created by Emily Gullo
**/

const fundingAgencyField = 'agency_id';

const tasPrefix = 'treasury_account__';
const appropriationsPrefix = 'treasury_account_identifier__';
const fileCPrefix = 'award__financial_set__';

const buildAgencyQueryWithPrefix = (funding, awarding, prefix) => {
    const toptierFundingSet = [];
    const subtierFundingSet = [];
    const toptierAwardingSet = [];
    const subtierAwardingSet = [];

    const filter = {
        combine_method: 'OR',
        filters: []
    };

    funding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierFundingSet.push(agencyArray.toptier_agency.name);
        }
        else {
            subtierFundingSet.push(agencyArray.subtier_agency.name);
        }
    });

    awarding.forEach((agencyArray) => {
        if (agencyArray.agencyType === 'toptier') {
            toptierAwardingSet.push(agencyArray.toptier_agency.name);
        }
        else {
            subtierAwardingSet.push(agencyArray.subtier_agency.name);
        }
    });

    if (toptierFundingSet.length > 0) {
        filter.filters.push({
            field: `${prefix}funding_agency__toptier_agency__name`,
            operation: "in",
            value: toptierFundingSet
        });
    }

    if (subtierFundingSet.length > 0) {
        filter.filters.push({
            field: `${prefix}funding_agency__subtier_agency__name`,
            operation: "in",
            value: subtierFundingSet
        });
    }

    if (toptierAwardingSet.length > 0) {
        filter.filters.push({
            field: `${prefix}awarding_agency__toptier_agency__name`,
            operation: "in",
            value: toptierAwardingSet
        });
    }

    if (subtierAwardingSet.length > 0) {
        filter.filters.push({
            field: `${prefix}awarding_agency__subtier_agency__name`,
            operation: "in",
            value: subtierAwardingSet
        });
    }

    return filter;
};

export const buildAgencyQuery = (funding, awarding) =>
    buildAgencyQueryWithPrefix(funding, awarding, '');

export const buildFileCAgencyQuery = (funding, awarding) =>
    buildAgencyQueryWithPrefix(funding, awarding, 'award__');

export const buildFundingAgencyCGACQuery = (funding, requestType) => {
    const fundingSet = [];

    funding.forEach((agencyArray) => {
        fundingSet.push(agencyArray.toptier_agency.cgac_code);
    });

    let agencyField = '';

    if (requestType === 'fileC') {
        agencyField = `${fileCPrefix}${tasPrefix}${fundingAgencyField}`;
    }
    else if (requestType === 'appropriations') {
        agencyField = `${appropriationsPrefix}${fundingAgencyField}`;
    }
    else {
        agencyField = `${tasPrefix}${fundingAgencyField}`;
    }

    const filter = {
        field: agencyField,
        operation: "in",
        value: fundingSet
    };

    return filter;
};
