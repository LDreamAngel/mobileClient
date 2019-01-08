/**
 * Created by liuxl on 2018/6/12
 */
import conf from '../../conf.js'
function CustomError(code = 0, message = '未知异常') {
  this.code = code;
  this.message = message
  this.stack = (new Error).stack;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

CustomError.codes = conf.BussionCode;

export default CustomError;
