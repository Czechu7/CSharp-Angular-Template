import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AltchaComponent } from './altcha.component';
import { AltchaProps } from '../../types/altcha.types';
import { HttpClientModule } from '@angular/common/http';
import { AltchaService } from '../../services/altcha.service';
import { IAltchaStatus } from '../../models/altcha.model';

class MockAltchaService {
  handleAltcha(status: IAltchaStatus): void {
    console.log('MockAltchaService: ', status);
  }
}

const meta: Meta<AltchaComponent> = {
  title: 'Components/Altcha',
  component: AltchaComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule],
      providers: [{ provide: AltchaService, useClass: MockAltchaService }],
    }),
  ],
};
export default meta;

const args: AltchaProps = {
  challengeurl: '',
  debug: true,
  test: true,
  value: '',
};

type AltchaStory = StoryObj<AltchaComponent>;

export const Primary: AltchaStory = {
  args: args,
};
