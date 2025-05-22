import { generateUser } from '@/api/mock';
import { fakerPL as faker } from '@faker-js/faker';
import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../request.ts';

export const mock = () => {
    faker.seed(123);

    const mockAxiosAdapter = new MockAdapter(apiClient, {
        delayResponse: 0,
    });

    mockAxiosAdapter.onGet('/user').reply(200, generateUser());

    return mockAxiosAdapter;
};
