import { format, addDays, subDays } from 'date-fns';

export const getTodayDate = () => {
    return format(new Date(), 'yyyy-MM-dd');
};

export const getFutureDate = (days) => {
    return format(addDays(new Date(), days), 'yyyy-MM-dd');
};

export const getPastDate = (days) => {
    return format(subDays(new Date(), days), 'yyyy-MM-dd');
};

export const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
};
