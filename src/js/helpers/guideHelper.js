/**
  * guideHelper.js
  * Created by Kevin Li 5/3/17
  **/

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

// perform search is a cancellable promise
export const fetchAllTerms = () => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'references/guide/?limit=500',
            baseURL: kGlobalConstants.API,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
