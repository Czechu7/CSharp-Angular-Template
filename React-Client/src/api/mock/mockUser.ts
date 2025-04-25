import { fakerPL as faker } from '@faker-js/faker';
import { User as UserType } from '@/types';

export const generateUser = (): UserType => ({
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
});
