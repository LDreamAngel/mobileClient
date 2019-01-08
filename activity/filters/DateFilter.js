/**
 * Created by liuxl on 2018/6/18.
 * 时间处理
 */
import Utils from '../common/js/util';

export const formatDate = (date,pattern) =>{
  if (typeof date == 'string'){
    date = new Date(date);
  }
  return Utils.formatDate.format(date,pattern);
};
