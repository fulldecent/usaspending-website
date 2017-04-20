/**
* KeywordQuery.js
* Created by Emily Gullo
**/

const keywordField = 'description';

const buildKeywordQueryWithPrefix = (value, prefix) => {
    const keyword = value;

    const filter = {
        field: `${prefix}${keywordField}`,
        operation: "search",
        value: keyword
    };

    return filter;
};

export const buildKeywordQuery = (value) =>
    buildKeywordQueryWithPrefix(value, '');

export const buildFileCKeywordQuery = (value) =>
    buildKeywordQueryWithPrefix(value, 'award__');
