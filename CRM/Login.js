const Login = ({ intl }) => {
  const { successAuthHandler } = useContext(AppContext);
  const [err, setErr] = useState(false);

  const handleLogin = (values) => {
    client
      .query({
        query: login,
        variables: {
          email: values.email,
          password: values.password,
        },
      })
      .catch()
      .then(async (response) => {
        if (response.data.loginUser.token) {
          await setToken(response.data.loginUser.token);
          successAuthHandler(true);
        }
      })
      .catch((error) => error && setErr(true));
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/images/login-background.jpg')}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleLogin(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, errors, touched, handleSubmit, isSubmitting }) => (
          <View style={styles.wrapper}>
            <Title style={styles.title}>FlexibleCRM</Title>
            {err && (
              <Text style={{ color: 'tomato' }}>
                {intl.formatMessage({
                  id: 'login.emailOrPasswordIsIncorrect',
                  defaultMessage: 'Email or password is incorrect',
                })}
              </Text>
            )}
            <Input
              name='email'
              value={values.email}
              label={intl.formatMessage({ id: 'app.email', defaultMessage: 'Email' })}
              onChange={handleChange}
              error={errors.email && touched.email && errors.email}
              keyboardType='email-address'
            />
            <Input
              name='password'
              value={values.password}
              label={intl.formatMessage({
                id: 'app.password',
                defaultMessage: 'Password',
              })}
              onChange={handleChange}
              error={errors.password && touched.password && errors.password}
              secureTextEntry
            />
            <Button
              mode='contained'
              onPress={handleSubmit}
              loading={isSubmitting && !err}
              disabled={isSubmitting && !err}
            >
              {intl.formatMessage({ id: 'app.login', defaultMessage: 'Login' })}
            </Button>
          </View>
        )}
      </Formik>
    </ImageBackground>
  );
};

export default injectIntl(Login);
