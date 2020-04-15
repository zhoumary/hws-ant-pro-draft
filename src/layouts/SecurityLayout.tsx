import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { Cookies } from 'react-cookie';

import { ConnectState } from '@/models/connect';
// import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  // currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
  isLoggedIn?: string;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
    isLoggedIn: "false"
  };

  componentDidMount() {
    const currCookies = new Cookies();
    const isLogIn = currCookies.get("isLoggedIn");

    this.setState({
      isReady: true,
      isLoggedIn: isLogIn
    });


    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
  }

  render() {
    const { isReady, isLoggedIn } = this.state;
    // const { children, loading, currentUser } = this.props;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = isLoggedIn;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (((isLogin === "false" || !isLogin) && loading) || !isReady) {
      return <PageLoading />;
    }

    if ((isLogin === "false" || !isLogin) && (window.location.pathname !== '/user/login')) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
