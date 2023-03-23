import { serverService } from '@/services/serverService';

const maxSecond = 60;
const maxMinute = 60;
const maxHour = 24;
const yearToDays = 365.242199;
const monthToDays = 30.5;

export function timestampToTimeAgo(timestamp: number): string {
    let diff = Math.floor(
        Math.max(0, (serverService.serverTime - timestamp) / 1000)
    );

    if (diff < maxSecond) {
        return diff + ` sec${diff > 1 ? 's' : ''} ago`;
    }

    diff = Math.floor(diff / maxSecond);

    if (diff < maxMinute) {
        return diff + ` min${diff > 1 ? 's' : ''} ago`;
    }

    diff = Math.floor(diff / maxMinute);

    if (diff < maxHour) {
        return diff + ` hour${diff > 1 ? 's' : ''} ago`;
    }

    diff = Math.floor(diff / maxHour);

    if (diff < yearToDays) {
        if (diff <= Math.ceil(monthToDays)) {
            return diff + ` day${diff > 1 ? 's' : ''} ago`;
        }
        diff = Math.floor(diff / monthToDays);
        return diff + ` month${diff > 1 ? 's' : ''} ago`;
    }

    diff = Math.floor(diff / yearToDays);

    return diff + ' year ago';
}
