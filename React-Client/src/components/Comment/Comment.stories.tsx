import { Meta, StoryFn } from '@storybook/react';
import { Comment } from '@/components/Comment/Comment.tsx';
import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';
import { ReactNode } from 'react';

type Props = {
    username: string;
    avatarSrc: string;
    commentText: string;
    date: DateTime;
    reply: () => void;
    children?: ReactNode;
};

export default {
    title: 'Components/Comment',
    component: Comment,
} as Meta<typeof Comment>;

const Template: StoryFn<Props> = args => <Comment {...args} />;
export const Default = Template.bind({});
Default.args = {
    username: 'Marek Winiarz',
    avatarSrc: 'https://github.com/shadcn.png',
    commentText:
        'Wojtek zwrócił się osobno do zarządu powiatu o udzielenie zgody na zawarcie umowy służebności przesyłu',
    date: DateTime.fromJSDate(faker.date.soon()),
    reply: () => console.log('Reply clicked'),
};

export const WithNestedComment = Template.bind({});
WithNestedComment.args = {
    ...Default.args,
    children: (
        <Comment
            username="Anna Kowalska"
            avatarSrc="https://github.com/shadcn.png"
            commentText="To jest odpowiedź na komentarz."
            date={DateTime.fromJSDate(faker.date.soon())}
            reply={() => console.log('Nested reply clicked')}
        />
    ),
};
