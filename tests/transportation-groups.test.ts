import {
    groupTransportationDepartures,
} from '../src/components/transportation/transportation-groups';

describe('groupTransportationDepartures', () => {
    it('preserves profile and departure order while keeping duplicate stop names separate', () => {
        const groups = groupTransportationDepartures([
            {
                groupId: 'profile-1',
                lineId: '67',
                lineName: '67',
                finalStop: 'Avion',
                isLowFloor: true,
                timeMark: '10min',
                stopName: 'Schodová',
                postId: 2,
            },
            {
                groupId: 'profile-2',
                lineId: '25',
                lineName: '25',
                finalStop: 'Líšeň, Jírova',
                isLowFloor: false,
                timeMark: '2min',
                stopName: 'Za Lužánkami',
                postId: 1,
            },
            {
                groupId: 'profile-1',
                lineId: '67',
                lineName: '67',
                finalStop: 'Avion',
                isLowFloor: true,
                timeMark: '24min',
                stopName: 'Schodová',
                postId: 2,
            },
        ]);

        expect(groups.map(group => group.id)).toEqual(['profile-1', 'profile-2']);
        expect(groups[0].departures.map(departure => departure.timeMark)).toEqual([
            '10min',
            '24min',
        ]);
        expect(groups[1].stopName).toBe('Za Lužánkami');
    });
});
