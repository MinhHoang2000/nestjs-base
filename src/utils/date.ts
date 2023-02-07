import * as moment from 'moment';

export const formatDateTime = (
  time: any,
  format = 'MMMM Do YYYY, h:mm:ss a',
) => {
  return moment(time).format(format);
};
