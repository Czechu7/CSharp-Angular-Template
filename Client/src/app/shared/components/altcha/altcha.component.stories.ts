import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AltchaComponent } from './altcha.component';
import { IAltchaProps } from '../../types/altcha.types';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta<AltchaComponent> = {
  title: 'Components/Altcha',
  component: AltchaComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule],
      providers: [],
    }),
  ],
};
export default meta;

const args: IAltchaProps = {
  challengeurl: '',
  debug: true,
  test: true,
  value: '',
};

type AltchaStory = StoryObj<AltchaComponent>;

export const Primary: AltchaStory = {
  args: args,
};
