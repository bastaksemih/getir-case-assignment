const request = require('supertest');
const app = require('../app');

describe('getFilteredRecords test cases', () => {
    let requestData;

    beforeEach(() => {
        jest.useFakeTimers();
        requestData = {
            startDate: '2016-01-26',
            endDate: '2017-02-02',
            minCount: '2700',
            maxCount: '3000',
        };
    });


    const getRequests = () => request(app).post('/api/getFilteredRecords').send(requestData);

    it('startDate input required test', async () => {
        delete requestData.startDate;
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(2);
    });

    it('maxCount input required test', async () => {
        delete requestData.maxCount;
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(2);
    });

    it('minCount input required test', async () => {
        delete requestData.minCount;
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(2);
    });

    it('endDate input required test', async () => {
        delete requestData.endDate;
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(2);
    });

    it('invalid startDate parameter test', async () => {
        requestData.startDate = '999';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(3);
    });

    it('invalid endDate parameter test', async () => {
        requestData.endDate = '999';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(4);
    });

    it('invalid minCount parameter test', async () => {
        requestData.minCount = 'aaaa';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(5);
    });

    it('invalid maxCount parameter test', async () => {
        requestData.maxCount = 'aaaa';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(6);
    });

    it('maxCount should be bigger test', async () => {
        requestData.maxCount = '1000';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(7);
    });

    it('maxCount or minCount can not be smaller than 0 test', async () => {
        requestData.maxCount = '-1';
        const res = await getRequests();
        expect(res.status).toBe(400);
        expect(res.body.code).toBe(8);
    });

    it('successful record list retrieval', async () => {
        const res = await getRequests();
        expect(res.status).toBe(200);
        expect(res.body.code).toBe(0);
        expect(Array.isArray(res.body.records)).toBe(true);
        expect('key' in res.body.records[0])
        expect('createdAt' in res.body.records[0])
        expect('totalCount' in res.body.records[0])
    });

});
