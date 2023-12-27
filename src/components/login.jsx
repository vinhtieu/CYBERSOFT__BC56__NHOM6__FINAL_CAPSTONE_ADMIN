import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

export default function Login({ action }) {
  const onFinish = (values) => {
    const account = { taiKhoan: values.username, matKhau: values.password };
    const isRemember = values.remember;
    action(account, isRemember);
  };
  return (
    <Form
      name="normal_login"
      className="absolute w-[350px] p-6 -translate-x-1/2 -translate-y-1/2 [box-shadow:rgba(0,_0,_0,_0.15)_0px_2px_8px] login-form h-auto top-1/2 left-1/2 rounded-md"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}>
      <Form.Item>
        <h1 className="mb-6 text-5xl text-center text-black site-form-item-icon">
          Login
        </h1>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}>
        <Input
          prefix={<UserOutlined className="h-8 site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}>
        <Input
          prefix={<LockOutlined className="h-8 site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item className="mb-8">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox defaultChecked={false} checked={false}>
            Remember me
          </Checkbox>
        </Form.Item>

        <a className="float-right" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full  bg-[#1677ff] h-9 text-base">
          Log in
        </Button>
      </Form.Item>
      <Form.Item className="m-0 mt-auto text-center">
        <span>
          Don't have an account?{" "}
          <a className="text-blue-300 hover:text-blue-500">Register</a>
        </span>
      </Form.Item>
    </Form>
  );
}
