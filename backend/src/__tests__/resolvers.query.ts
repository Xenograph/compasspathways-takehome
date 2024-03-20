import { ObjectId } from 'mongodb';
import resolvers from '../resolvers/index.js';
import FakeAnalyticsDataSource from '../testutil/FakeAnalyticsDataSource.js';

describe('[Query.customers]', () => {
  const mockContext = {
    dataSource: new FakeAnalyticsDataSource(
      [
        {
          _id: ObjectId.createFromTime(1),
          username: 'Username1',
          name: 'Name1',
          address: 'Address1',
          birthdate: new Date('1970-01-02T10:17:25.234Z'),
          email: 'Email1',
          accounts: [123, 456],
          tier_and_details: {
            Tier1ID: {
              active: true,
              benefits: ['benefit1', 'benefit2'],
              tier: 'Tier1ID',
              id: 'abc'
            }
          }
        },
        {
          _id: ObjectId.createFromTime(2),
          username: 'Username2',
          name: 'Name2',
          address: 'Address2',
          birthdate: new Date('1970-01-02T10:17:25.534Z'),
          email: 'Email2',
          accounts: [789, 888],
          tier_and_details: {
            def: {
              active: true,
              benefits: ['benefit3', 'benefit4'],
              tier: 'tier2',
              id: 'def'
            }
          }
        }
      ],
      [],
      {}
    )
  };

  it('lists all customers', async () => {
    const res = await resolvers.Query.customers(
      null,
      { page: 1, pageSize: 10 },
      mockContext,
      null
    );
    expect(res).toEqual({
      items: [
        {
          _id: ObjectId.createFromTime(1),
          accounts: [123, 456],
          address: 'Address1',
          birthdate: new Date('1970-01-02T10:17:25.234Z'),
          email: 'Email1',
          name: 'Name1',
          tier_and_details: {
            Tier1ID: {
              active: true,
              benefits: ['benefit1', 'benefit2'],
              id: 'abc',
              tier: 'Tier1ID'
            }
          },
          username: 'Username1'
        },
        {
          _id: ObjectId.createFromTime(2),
          accounts: [789, 888],
          address: 'Address2',
          birthdate: new Date('1970-01-02T10:17:25.534Z'),
          email: 'Email2',
          name: 'Name2',
          tier_and_details: {
            def: {
              active: true,
              benefits: ['benefit3', 'benefit4'],
              id: 'def',
              tier: 'tier2'
            }
          },
          username: 'Username2'
        }
      ],
      more: false
    });
  });

  it('respects pageSize arg', async () => {
    const res = await resolvers.Query.customers(
      null,
      { page: 1, pageSize: 1 },
      mockContext,
      null
    );
    expect(res).toEqual({
      items: [
        {
          _id: ObjectId.createFromTime(1),
          accounts: [123, 456],
          address: 'Address1',
          birthdate: new Date('1970-01-02T10:17:25.234Z'),
          email: 'Email1',
          name: 'Name1',
          tier_and_details: {
            Tier1ID: {
              active: true,
              benefits: ['benefit1', 'benefit2'],
              id: 'abc',
              tier: 'Tier1ID'
            }
          },
          username: 'Username1'
        }
      ],
      more: true
    });
  });

  it('sets more=false on last page', async () => {
    const res = await resolvers.Query.customers(
      null,
      { page: 2, pageSize: 1 },
      mockContext,
      null
    );
    expect(res).toEqual({
      items: [
        {
          _id: ObjectId.createFromTime(2),
          accounts: [789, 888],
          address: 'Address2',
          birthdate: new Date('1970-01-02T10:17:25.534Z'),
          email: 'Email2',
          name: 'Name2',
          tier_and_details: {
            def: {
              active: true,
              benefits: ['benefit3', 'benefit4'],
              id: 'def',
              tier: 'tier2'
            }
          },
          username: 'Username2'
        }
      ],
      more: false
    });
  });

  it('returns no items when past final page', async () => {
    const res = await resolvers.Query.customers(
      null,
      { page: 3, pageSize: 1 },
      mockContext,
      null
    );
    expect(res).toEqual({
      items: [],
      more: false
    });
  });
});
