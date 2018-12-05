import React, {Component} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import Link from 'umi/link';
import {Checkbox, Alert, Icon} from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(({account, loading}) => ({
  account,
  submitting: loading.effects['account/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({type});
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const {dispatch} = this.props;
          dispatch({
            type: 'account/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const {type} = this.state;
    if (!err) {
      const {dispatch} = this.props;
      dispatch({
        type: 'account/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>
  );

  render() {
    const {account, submitting} = this.props;
    const {type, autoLogin} = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {/*<Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>*/}
          {account.status === 'error' &&
          account.type === 'account' &&
          !submitting &&
          this.renderMessage(formatMessage({id: 'app.login.message-invalid-credentials'}))}
          <UserName name="username" placeholder="账户"/>
          <Password
            name="password"
            placeholder="密码"
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          {/*</Tab>*/}
          {/*<Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>*/}
          {/*{login.status === 'error' &&*/}
          {/*login.type === 'mobile' &&*/}
          {/*!submitting &&*/}
          {/*this.renderMessage(*/}
          {/*formatMessage({ id: 'app.login.message-invalid-verification-code' })*/}
          {/*)}*/}
          {/*<Mobile name="mobile" />*/}
          {/*<Captcha*/}
          {/*name="captcha"*/}
          {/*countDown={120}*/}
          {/*onGetCaptcha={this.onGetCaptcha}*/}
          {/*getCaptchaButtonText={formatMessage({ id: 'form.captcha' })}*/}
          {/*getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}*/}
          {/*/>*/}
          {/*</Tab>*/}
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me"/>
            </Checkbox>
            {/*<a style={{ float: 'right' }} href="">*/}
            {/*<FormattedMessage id="app.login.forgot-password" />*/}
            {/*</a>*/}
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login"/>
          </Submit>
          {/*<div className={styles.other}>*/}
          {/*<FormattedMessage id="app.login.sign-in-with" />*/}
          {/*<Icon type="alipay-circle" className={styles.icon} theme="outlined" />*/}
          {/*<Icon type="taobao-circle" className={styles.icon} theme="outlined" />*/}
          {/*<Icon type="weibo-circle" className={styles.icon} theme="outlined" />*/}
          {/*<Link className={styles.register} to="/user/register">*/}
          {/*<FormattedMessage id="app.login.signup" />*/}
          {/*</Link>*/}
          {/*</div>*/}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
