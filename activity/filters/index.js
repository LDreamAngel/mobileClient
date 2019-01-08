/**
 * Created by liuxl on 2018/6/18.
 */

import Vue from 'vue';
// import * as StringFilter from './StringFilter';
// import * as NumberFilter from './NumberFilter';
import * as DateFilter from './DateFilter';
// import vFilter from './PublicFilter';


// Vue.filter('upper', StringFilter.upper);
// Vue.filter('lower', StringFilter.lower);
// Vue.filter('capitalize', StringFilter.capitalize);

// Vue.filter('currency', NumberFilter.currency);
Vue.filter('formatDate', DateFilter.formatDate);
// Vue.filter('timeFilter', vFilter.timeFilter);
// Vue.filter('spliceLength', vFilter.spliceLength);
export default {
//   ...StringFilter,
//   ...NumberFilter,
  ...DateFilter,
//   ...vFilter
}
