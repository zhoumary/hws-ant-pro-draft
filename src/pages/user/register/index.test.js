import React from 'react';
import {mount} from 'enzyme';

import {Register} from './index';

describe('<Register />', () => {
  it('renders register component', () => {
    // 使用包装后的组件
    const wrapper = mount(<Register.WrappedComponent submitting={undefined} dispatch={jest.fn()} userAndregister={{
      status: 'ok',
      userID: undefined
    }} />);
    expect(wrapper.find('[name ="mail"]').length).toBe(1);
  });
})
