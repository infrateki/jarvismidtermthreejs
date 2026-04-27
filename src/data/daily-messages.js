const RAW = [0,4,50,0,19,20,10,5,15,7,5,75,86,30,3,33,4,17,12,22,8,7,7,26,13,8,48,14,12,93,38,73,123,179,41,54,206,44,36,9,93,2,2,81,10,27,12,109,3,3,14,181,242,455,125,1078,210];

export const DAILY_MESSAGES = RAW.map((messages, i) => ({ day: i + 1, messages }));

export const PEAK_DAY = { day: 56, date: '2026-04-25', value: 1078, context: 'GPT-5.5 migration day' };
