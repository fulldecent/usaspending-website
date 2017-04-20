/**
  * SearchTransactionOperation.js
  * Created by Kevin Li 12/26/17
  **/

import SearchOperation from './SearchOperation';

import * as TxnTimePeriodQuery from './queryBuilders/TxnTimePeriodQuery';
import * as AwardIDQuery from './queryBuilders/AwardIDQuery';
import * as AwardAmountQuery from './queryBuilders/AwardAmountQuery';
import * as AgencyQuery from './queryBuilders/AgencyQuery';
import * as AwardTypeQuery from './queryBuilders/AwardTypeQuery';
import * as LocationQuery from './queryBuilders/LocationQuery';
import * as RecipientQuery from './queryBuilders/RecipientQuery';
import * as KeywordQuery from './queryBuilders/KeywordQuery';

class SearchTransactionOperation extends SearchOperation {

    uniqueParams() {
        // the parent class will handle all the common params, we just need to convert those
        // that are not shared with awards
        const filters = [];

        // add keyword query
        if (this.keyword !== '') {
            filters.push(KeywordQuery.buildFileCKeywordQuery(this.keyword));
        }

        // add time period queries
        // Todo: Modify for new endpoint
        if (this.timePeriodFY.length > 0 || this.timePeriodRange.length === 2) {
            const timeQuery = TxnTimePeriodQuery.buildTxnActionDateQuery({
                type: this.timePeriodType,
                fyRange: this.timePeriodFY,
                dateRange: this.timePeriodRange
            });
            if (timeQuery) {
                filters.push(timeQuery);
            }
        }

        // Add location queries
        if (this.selectedLocations.length > 0) {
            filters.push(LocationQuery.buildFileCLocationQuery(this.selectedLocations));
        }

        if (this.locationDomesticForeign !== '' && this.locationDomesticForeign !== 'all') {
            filters.push(LocationQuery.buildFileCDomesticForeignQuery(
                this.locationDomesticForeign));
        }

        // Add agency query
        if (this.fundingAgencies.length > 0 || this.awardingAgencies.length > 0) {
            filters.push(AgencyQuery.buildFileCAgencyQuery(
                this.fundingAgencies, this.awardingAgencies));
        }

        // Add recipient queries
        if (this.selectedRecipients.length > 0) {
            filters.push(RecipientQuery.buildFileCRecipientQuery(
                this.selectedRecipients));
        }

        if (this.recipientDomesticForeign !== '' && this.recipientDomesticForeign !== 'all') {
            filters.push(RecipientQuery.buildFileCDomesticForeignQuery(
                this.recipientDomesticForeign));
        }

        if (this.selectedRecipientLocations.length > 0) {
            filters.push(RecipientQuery.buildFileCRecipientLocationQuery(
                this.selectedRecipientLocations)
            );
        }

        // Add award types
        // Todo: Modify for new endpoint
        if (this.awardType.length > 0) {
            filters.push(AwardTypeQuery.buildQuery(this.awardType));
        }

        // Todo: Modify for new endpoint
        if (this.resultAwardType.length > 0) {
            // an award type subfilter is being applied to the search results (usually from
            // a results table tab)
            // treat this as an AND query for another set of award filters
            // for aggregation queries, we won't apply the prefix to this field because this
            // is specific to the results table
            filters.push(AwardTypeQuery.buildQuery(this.resultAwardType));
        }

        // Add Award ID Queries
        // Todo: SHOULD NOT HAVE TO MODIFY
        if (this.selectedAwardIDs.length > 0) {
            filters.push(AwardIDQuery.buildAwardIDQuery(
                this.selectedAwardIDs, 'total')
            );
        }

        // Add Award Amount queries
        // Todo: Modify for new endpoint
        if (this.awardAmounts.length > 0) {
            const awardAmountsQuery = AwardAmountQuery.buildAwardAmountQuery(
                this.awardAmounts, 'total');
            if (awardAmountsQuery) {
                filters.push(awardAmountsQuery);
            }
        }

        return filters;
    }
}

export default SearchTransactionOperation;
